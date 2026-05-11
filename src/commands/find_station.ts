import { Composer, Context, Keyboard } from "grammy";
import User from "../models/User.js";
import StationWork from "../models/StationWork.js";
import { messages } from "../utils/messages.js";

const composer = new Composer();

const queryFindWithText = async (text: string) => {
    return await StationWork.find({
        $or: [
            { name: { $regex: text, $options: "i" } },
            { address: { $regex: text, $options: "i" } },
        ],
        "data.status": { $ne: "Maintaining" }
    }
    ).limit(10);
}

const findWithText = async (ctx: Context, text: string) => {
    try {
        let messageId = ctx.update.message?.message_id;
        let user = await User.findOne({ telegramId: String(ctx.update.message?.from.id) });
        console.log("User data:", JSON.stringify(user, null, 2));
        let data = await queryFindWithText(text);
        if (data.length === 0) {
            await ctx.reply("❌ Không tìm thấy kết quả!");
            return;
        }
        let message = "";
        for (let i = 0; i < data.length; i++) {
            let tempData = data[i] as any;
            message += messages.stationToDetail(tempData, user) + "\n\n";
        }
        await ctx.reply(message, {
            reply_to_message_id: Number(messageId),
        });
        // console.log("Data find with text:", JSON.stringify(ctx, null, 2));
    } catch (error) {
        console.error(error);
    }
}

const findStation = async (ctx: Context) => {
    try {
        // console.log("Data find station:", JSON.stringify(ctx, null, 2));
        const hasData = String(ctx.match);
        if (hasData) {
            return await findWithText(ctx, hasData);
        }

        const keyboard = new Keyboard()
            .requestLocation("📍 Gửi vị trí hiện tại của tôi")
            .oneTime()
            .resized();
        let user = await User.findOne({ telegramId: String(ctx.update.message?.from.id) });
        if (!user) {
            await User.create({ telegramId: String(ctx.update.message?.from.id) });
            user = await User.findOne({ telegramId: String(ctx.update.message?.from.id) });
        }
        if (!user) {
            await ctx.reply("❌ Không tìm thấy người dùng!");
            return;
        }
        if (user.latitude === 0 && user.longitude === 0) {
            await ctx.reply("Tin nhắn yêu cầu vị trí đã gửi vào tin nhắn riêng, vui lòng bấm nút bên dưới để gửi vị trí hiện tại của bạn!");
            await ctx.api.sendMessage(Number(ctx.update.message?.from.id),
                "🔋 **Tìm trạm đổi pin VinFast**\n\n" +
                "Để mình tìm trạm gần bạn nhất, hãy nhấn nút **\"📍 Gửi vị trí hiện tại của tôi\"** bên dưới nhé!",
                {
                    reply_markup: keyboard,
                    parse_mode: "Markdown",
                }
            );
        } else {
            await ctx.reply("🔋Ấdqwrqweead");
        }

    } catch (error) {
        console.error(error);
    }
}

composer.command("find_station", findStation);
composer.command("timtram", findStation);
export default composer;