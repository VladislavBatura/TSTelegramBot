import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import * as config from "../src/config.json";

const bot: Telegraf<Context<Update>> = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`Hello, ${ctx.from.first_name}!`);
});

bot.help((ctx) => {
    ctx.reply('Send /start to see whats going to happen');
    ctx.reply('Send /keyboard to see keyboard, obviously');
    ctx.reply('Send /quit to stop the bot');
});

bot.command('quit', (ctx) =>{
    ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
    ctx.reply('keyboard',
        Markup.inlineKeyboard([
             Markup.button.callback('first option', 'first'),
             Markup.button.callback('second option', 'second')
        ])
    );
});

bot.on('text', (ctx) => {
    ctx.reply(`You choose the ${ctx.message.text === 'first' ? 'First' : 'Second'} option!`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
