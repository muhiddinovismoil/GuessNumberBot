import { Bot } from "grammy";
import { config } from "dotenv";
config();

const bot = new Bot(process.env.BOT_TOKEN);
let secretNumber = Math.floor(Math.random() * 100) + 1;
const resetGame = () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
};
bot.command("start", (ctx) => {
    ctx.reply(
        `HELLO! ${ctx.chat.first_name} ${
            ctx.chat.last_name || ""
        }  I GUESSED 1 TO 100 NUMBER CAN YOU FIND IT`
    );
    resetGame();
});
bot.on("message", (ctx) => {
    const userGuess = parseInt(ctx.message.text, 10);
    if (isNaN(userGuess)) {
        ctx.reply("PLEASE, SEND NUMBER.");
        return;
    }
    if (userGuess < secretNumber) {
        ctx.reply("ENTER A BIG NUMBER!");
    } else if (userGuess > secretNumber) {
        ctx.reply("ENTER A SMALL NUMBER!");
    } else {
        ctx.reply(`CONGRATULATIONS YOU WON 🏆: ${secretNumber}`);
        resetGame();
    }
});
bot.catch((err) => console.error("Bot Error:", err));
bot.start();
