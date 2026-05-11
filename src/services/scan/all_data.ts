import { Bot } from "grammy";
import cron from "node-cron";
import Station from '../../models/Station.js';
import { gotScraping } from 'got-scraping';
const url_all_data = "https://vinfastauto.com/vn_vi/get-locators";
const key_battery_swap_station = 'battery_swap_station';
const timeoutMinutes = 10;
const timeoutMilliseconds = timeoutMinutes * 60 * 1000;
let isRunning = false;
let timeRun = 0;

const initCronAllData =  (bot: Bot) => {
  // bot.api.sendMessage(process.env.CHAT_ID_ADMIN || '', 'Cron job is running');
  cron.schedule("0 */2 * * *", async () => {
    try {
        if (isRunning) {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - timeRun;
            if (timeDiff > timeoutMilliseconds) {
                isRunning = false;
                timeRun = 0;
                return;
            }
            else {
                let message = `Cron job is running for ${timeDiff}ms`;
                bot.api.sendMessage(process.env.CHAT_ID_ADMIN || '', message);
                return;


            }
        }
        isRunning = true;
        timeRun = new Date().getTime();
        console.log("Cron job is running");
        const response = await gotScraping({
            url: url_all_data,
            });
        let data = JSON.parse(response.body);
        let full_data = data['data'];
        const operations = full_data
            .filter((data: any) => data['bundle'] === key_battery_swap_station)
            .map((data: any) => ({
                updateOne: {
                    filter: { entity_id: data.entity_id },
                    update: { $set: data },
                    upsert: true
                }
            }));
        
        if (operations.length > 0) {
            await Station.bulkWrite(operations);
        }
        console.log("Add stations: ", operations.length);
    } catch (error) {
        console.error(error);
    }
    
  });
};

export default initCronAllData;
