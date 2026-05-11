import { Bot } from "grammy";
import telegramLogger from "../../logger/telegram_log.js";
import cron from "node-cron";
import Station from "../../models/Station.js";
import StationWork from "../../models/StationWork.js";
// import { getQuery } from "../../utils/query.js";
// import { sleep } from "../../utils/sleep.js";
// import { getStat } from "../../utils/stat.js";
// import { getStatWork } from "../../utils/stat_work.js";
// import { getStatWork } from "../../utils/stat_work.js";
const MESSAGE_ID_STAT = Number(process.env.MESSAGE_ID_STAT || "0");
const CHAT_ID_ADMIN = process.env.CHAT_ID_ADMIN || "";

const getStat = async () => {
    let totalStation = await Station.countDocuments();
    let totalStationWork = await StationWork.countDocuments();
    return {
        totalStation,
        totalStationWork,
    }
}

const initCronStatToTelegram = async (bot: Bot) => {
    cron.schedule("* * * * *", async () => {
        try {
            let stat = await getStat();
            let message = `
Tổng số trạm: ${stat.totalStationWork}/${stat.totalStation}
Cập nhật lúc: ${new Date().toISOString()}
`
            try {
                await bot.api.editMessageText(CHAT_ID_ADMIN, MESSAGE_ID_STAT, message);
            } catch (error) {
                telegramLogger.error(error);
            }
        } catch (error) {
            telegramLogger.error(error);
        }
    })
}

export default initCronStatToTelegram;