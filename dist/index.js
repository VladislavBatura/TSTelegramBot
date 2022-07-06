"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
    ctx.reply(`Hello, ${ctx.from.first_name}!`);
});
bot.help((ctx) => {
    ctx.reply('Send /start to see whats going to happen');
    ctx.reply('Send /keyboard to see keyboard, obviously');
    ctx.reply('Send /quit to stop the bot');
});
bot.command('quit', (ctx) => {
    ctx.leaveChat();
});
bot.command('keyboard', (ctx) => {
    ctx.reply('keyboard', telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('first option', 'first'),
        telegraf_1.Markup.button.callback('second option', 'second')
    ]));
});
bot.on('text', (ctx) => {
    ctx.reply(`You choose the ${ctx.message.text === 'first' ? 'First' : 'Second'} option!`);
});
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
bot.launch();
//# sourceMappingURL=index.js.map