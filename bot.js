const Telegram = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');


const botToken = "";
const openaiToken = "";

const config = new Configuration({
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome To AI ChatBot");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  const reply = 
  await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages:  [{"role": 'user', "content": msg.text}]
  });

  // await openai.createCompletion({
  //   max_tokens: 1000,
  //   model: "ada",
  //   prompt: msg.text,
  //   temperature: 0.5,
  // });

  bot.sendMessage(chatId, reply.data.choices[0].message.content);
});
