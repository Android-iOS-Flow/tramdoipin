import { Composer, Context, Keyboard } from "grammy";
import User from "../models/User.js";

const composer = new Composer();

const mLocation = async (ctx: Context) => {
    try {
        let telegramId = String(ctx.update.message?.from.id);
        // console.log("Data m location:", JSON.stringify(ctx, null, 2));
        const location = ctx.message?.location;
        if (!location) {
            await ctx.reply("❌ Không nhận được vị trí. Vui lòng thử lại!");
            return;
        }
        const { latitude, longitude } = location;
        // Xóa bàn phím (nếu còn)
        await ctx.reply("✅ Đã nhận được vị trí của bạn!", {
            reply_markup: { remove_keyboard: true },
        });
        // console.log(`📍 Vị trí nhận được: Lat=${latitude}, Lon=${longitude}`);
        await User.updateOne({ telegramId: telegramId }, { $set: { latitude, longitude } });
    } catch (error) {
        console.error(error);
    }
}

composer.on("message:location", mLocation);
export default composer;