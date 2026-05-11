import { Composer } from "grammy";
import User from "../models/User.js";
import type { IUser } from "../models/User.js";
import TLog from "../logger/telegram_log.js";

const composer = new Composer();

composer.command("start", async (ctx) => {
    const { id, username, first_name } = ctx.from ?? {};

    try {
        await User.findOneAndUpdate<IUser>(
            { telegramId: id?.toString() } as any,
            { username, firstName: first_name },
            { upsert: true }
        );
        TLog.info(`User ${id} started the bot`);
        await ctx.reply(`Chào ${first_name}! Bạn đang sử dụng Bot xây dựng bằng grammY 🚀`);
    } catch (error) {
        console.error("Error at start command:", error);
        await ctx.reply("Có lỗi xảy ra.");
    }
});

export default composer;