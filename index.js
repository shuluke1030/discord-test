require('dotenv').config()
const { Client, GatewayIntentBits, time } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var axios = require('axios');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    const msg = await interaction.reply({
      content: '正在計算延遲......',
      fetchReply: true
    });
    const ping = msg.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(`機器人延遲：${ping} ms\nＡＰＩ延遲：${client.ws.ping} ms`)

  }

  if (interaction.commandName === 'time') {
    const now = new Date()
    const hours = now.getHours();
    const minutes = now.getMinutes();
    interaction.reply(`現在時間是：${hours}:${minutes}`);
  }
  if (interaction.commandName === 'apexmap') {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.mozambiquehe.re/maprotation',
      headers: {
        'Authorization': '7d9345d26bb3b916cf7085f22d81b2cc'
      }
    };

    axios(config)
      .then(function (response) {
        const translations = {
          "World's Edge": "世界邊緣",
          "Broken Moon": "殘月",
          "Kings Canyon": "王者峽谷",
          "Olympus": "奧林匹斯",
          "Storm Point": "風暴點",
        }
        const currentMap = translations[response.data.current.map];
        const mapPng = response.data.current.asset;
        const nextMap = translations[response.data.next.map];
        const leftTime = response.data.current.remainingTimer;
        

        console.log(`當前地圖是：${currentMap}`);
        console.log(`${mapPng}`);
        console.log(`下一張地圖是：${nextMap}`);
        console.log(`剩餘時間：${leftTime}`);
        interaction.reply(`當前地圖是：${currentMap}\n${mapPng}\n地圖更換剩餘：${leftTime}\n下一張地圖是：${nextMap}`);
      })
      .catch(function (error) {
        console.log(error);
        interaction.reply(`抱歉，獲取地圖資訊時出現錯誤`);
      });
  }
  if (interaction.commandName === 'apexcrafting') {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.mozambiquehe.re/crafting?7d9345d26bb3b916cf7085f22d81b2cc',
      headers: {
        'Authorization': '7d9345d26bb3b916cf7085f22d81b2cc'
      }
    };

    axios(config)
      .then(function (response) {
        //   const translations = {
        //   "shotgun_bolt": "槍栓",
        //   "double_tap_trigger": "雙擊觸發器",
        // }
          const items = [];
          for(let i = 0; i < response.data[0].bundleContent.length; i++){
          items.push(response.data[0].bundleContent[i].itemType.name);
        }; 
          const itemsPng = [];         
          for(let i = 0; i < response.data[0].bundleContent.length; i++){
            itemsPng.push(response.data[0].bundleContent[i].itemType.asset);
          };
          const itemUrls = itemsPng.join().split(',');
          const replyMessage = itemUrls.join('\n');
        console.log(`當日合成物品：${items}`);
        console.log(`${replyMessage}`);
        interaction.reply(`當日合成物品：${items}\n${replyMessage}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);