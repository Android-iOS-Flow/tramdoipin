import { Composer } from "grammy";

const composer = new Composer();

composer.command('chatid', async (ctx) => {
    console.log("Data chatid:", JSON.stringify(ctx, null, 2));
    let sentMessage = await ctx.reply(`Chat ID: ${ctx.chat.id}\nUser ID: ${ctx.from?.id}`);
    console.log("Sent message:", JSON.stringify(sentMessage, null, 2));
});

export default composer;