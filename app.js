import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import path from 'path';

dotenv.config()

const token = process.env.TELEGRAM_TOKEN

const options = {
  webHook: {
    port: process.env.APP_PORT
  }
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, options);

// Setup webhook
bot.setWebHook(`${process.env.APP_URL}/webhook/${token}`, {
  certificate: options.webHook.cert
})


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message wiith chat id ' + chatId);
});
