import { Bot } from "grammy";
import Station from "../../models/Station.js";
import StationWork from "../../models/StationWork.js";
import { gotScraping } from "got-scraping";
import { flatten } from "flat";
import SLog from "../../logger/vinfast_scan_log.js";

const url_station_info = "https://vinfastauto.com/vn_vi/get-locator/";
const getQuery = () => {
    let oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return {
        $or: [
            { lastTimeScan: { $exists: false } },
            { lastTimeScan: { $lt: oneHourAgo } },
        ],
    };
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const updateLastTimeScan = async (entity_id: string, addDays: number = 0) => {
    let lastTimeScan = new Date();
    if (addDays > 0) {
        lastTimeScan.setDate(lastTimeScan.getDate() + addDays);
    }
    await Station.updateOne(
        {
            entity_id: entity_id,
        },
        {
            $set: {
                lastTimeScan: lastTimeScan,
            },
        },
    );
    SLog.info(`S${entity_id} up last time to ${lastTimeScan}`);
}

const scanStation = async (entity_id: string) => {
    try {
        SLog.info(`Scan station ${entity_id}`);
        let url = `${url_station_info}${entity_id}`;
        let response = await gotScraping({
            url: url,
        });
        let dataJson = JSON.parse(response.body);
        if (!Object.hasOwn(dataJson, "data")) {
            SLog.info(`No data found for station ${entity_id}`);
            await updateLastTimeScan(entity_id);
            return;
        }
        let flatData: any = flatten(dataJson["data"]);
        if (!Object.hasOwn(flatData, "data.status")) {
            SLog.info(`Not found status of station ${entity_id}`);
            await updateLastTimeScan(entity_id);
            return;
        }
        let statusStation = flatData["data.status"];
        if (statusStation == "Planned") {
            SLog.info(`Station ${entity_id} is planned`);
            await updateLastTimeScan(entity_id, 2);
            return;
        }
        await StationWork.updateOne(
            {
                entity_id: entity_id,
            },
            {
                // $set: flatData,
                $set: {
                    ...flatData,
                    'lastTimeScan': new Date(),
                },
            },
            {
                upsert: true,
            },
        );
        SLog.info(`Station ${entity_id} is updated`);
        await updateLastTimeScan(entity_id);
    } catch (error) {
        SLog.error(error);
        console.error(error);
    }
};

const serviceScanStation = async (bot: Bot) => {
    try {
        while (true) {
            await sleep(1000);
            try {
                let station = await Station.findOne(getQuery()).sort({
                    lastTimeScan: 1,
                });
                if (!station) {
                    SLog.info("No station to scan");
                    continue;
                }
                let entity_id = station?.entity_id;
                if (!entity_id) {
                    SLog.info("No station to scan");
                    continue;
                }
                await scanStation(entity_id);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
export default serviceScanStation;
