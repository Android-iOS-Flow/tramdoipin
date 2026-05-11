import { Bot } from "grammy";
import composer from "./commands/index.js";
import initCronAllData from "./services/scan/all_data.js";
import initCronStation from "./services/scan/station.js";
import initCronStatToTelegram from "./services/stat/stat_to_telegram.js";
import telegramLogger from "./logger/telegram_log.js";

const botToken = process.env.BOT_TOKEN;
const bot = new Bot(botToken);

bot.use(composer);

bot.start();

initCronAllData(bot);
initCronStation(bot);
initCronStatToTelegram(bot);
telegramLogger.info("🤖 Bot is running...");
export default bot;