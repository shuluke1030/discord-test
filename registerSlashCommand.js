require('dotenv').config()
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: '得知機器人的延遲資訊',
  },
  {
    name: 'time', 
    description: '回應給你時間',
  },
  {
    name: 'apexmap',
    description:'回應當前地圖',
  },
  {
    name: 'apexcrafting',
    description:'回應當前合成器內容',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();