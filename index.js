require("dotenv").config();
const { Client, GatewayIntentBits, time, AttachmentBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var axios = require("axios");
const mergeImg = require("merge-img");
const fs = require("fs");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function mergeImage(aImageUrl, bImageUrl) {
    return new Promise((resolve, reject) => {
      mergeImg([aImageUrl, bImageUrl], { direction: false, offset: 5 })
        .then((img) => {
          img.write('./output.png', () => {
            console.log(`圖片已經成功保存到 ${'./output.png'}`);
            resolve('./output.png');
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
}

function deleteLocalImage(){
    fs.unlink('./output.png', (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`已經成功刪除檔案 ./output.png`);
    });
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    const msg = await interaction.reply({
      content: "正在計算延遲......",
      fetchReply: true,
    });
    const ping = msg.createdTimestamp - interaction.createdTimestamp;
    interaction.editReply(
      `機器人延遲：${ping} ms\nＡＰＩ延遲：${client.ws.ping} ms`
    );
  }

  if (interaction.commandName === "time") {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    interaction.reply(`現在時間是：${hours}:${minutes}`);
  }
  if (interaction.commandName === "apexmap") {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.mozambiquehe.re/maprotation",
      headers: {
        Authorization: "7d9345d26bb3b916cf7085f22d81b2cc",
      },
    };

    axios(config)
      .then(function (response) {
        const translations = {
          "World's Edge": "世界邊緣",
          "Broken Moon": "殘月",
          "Kings Canyon": "王者峽谷",
          Olympus: "奧林匹斯",
          "Storm Point": "風暴點",
        };
        const currentMap = translations[response.data.current.map];
        const mapPng = response.data.current.asset;
        const nextMap = translations[response.data.next.map];
        const leftTime = response.data.current.remainingTimer;

        console.log(`當前地圖是：${currentMap}`);
        console.log(`${mapPng}`);
        console.log(`下一張地圖是：${nextMap}`);
        console.log(`剩餘時間：${leftTime}`);
        interaction.reply(
          `當前地圖是：${currentMap}\n${mapPng}\n地圖更換剩餘：${leftTime}\n下一張地圖是：${nextMap}`
        );
      })
      .catch(function (error) {
        console.log(error);
        interaction.reply(`抱歉，獲取地圖資訊時出現錯誤`);
      });
  }
  if (interaction.commandName === "apexcrafting") {
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.mozambiquehe.re/crafting?7d9345d26bb3b916cf7085f22d81b2cc",
      headers: {
        Authorization: "7d9345d26bb3b916cf7085f22d81b2cc",
      },
    };

    axios(config)
      .then(async function (response) {
        const items = [];
        const itemUrls = [];
        for (let i = 0; i < response.data[0].bundleContent.length; i++) {
          items.push(response.data[0].bundleContent[i].itemType.name);
          itemUrls.push(response.data[0].bundleContent[i].itemType.asset);
        }
        console.log(`當日合成物品：${items}`);
        
        await mergeImage(itemUrls[0], itemUrls[1]);
        const attachment = new AttachmentBuilder('./output.png');
        await interaction.reply({ 
            content: "當日合成物品：",
            files: [attachment] });
        deleteLocalImage();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (interaction.commandName === "apexmixtape") {
    var config = {
      method: "get",
      url: "https://api.mozambiquehe.re/maprotation?version=17d9345d26bb3b916cf7085f22d81b2cc",
      headers: {
        Authorization: "7d9345d26bb3b916cf7085f22d81b2cc",
      },
    };

    axios(config)
      .then(function (response) {
        const ltmTranslations = {
          Skulltown: "骷髏鎮",
          TDM: "團隊死鬥",
          Wall: "障壁",
          "Gun Run": "快速直擊",
          Siphon: "岩漿虹吸管",
          "Party Crasher": "不速之客",
          Control: "控制",
          Overflow: "氾濫",
          Fragment: "破碎東方",
          Barometer: "晴雨表",
          Caustic: "腐蝕治療",
          Habitat: "4號實驗室",
        };
        const ltmCurrentMap = ltmTranslations[response.data.ltm.current.map];
        let ltmPic;
        const ltmNextMap = ltmTranslations[response.data.ltm.next.map];
        const ltmLeftTime = response.data.ltm.current.remainingTimer;
        const ltmCurrentEvent =
          ltmTranslations[response.data.ltm.current.eventName];
        const ltmNextEvent = ltmTranslations[response.data.ltm.next.eventName];
        if (ltmCurrentMap === "骷髏鎮") {
          ltmPic =
            "https://exp.gg/wp-content/uploads/2020/05/60p8xw8yczw41-1024x576.jpg";
        } else if (ltmCurrentMap === "障壁") {
          ltmPic =
            "https://cdna.artstation.com/p/assets/images/images/043/020/846/large/eugene-kim-tropics-01.jpg?1636065149";
        } else if (ltmCurrentMap === "岩漿虹吸管") {
          ltmPic =
            "https://media.contentapi.ea.com/content/dam/apex-legends/common/articles/s10-map-updates/apex-legends-screenshot-s10-env-05-lavasiphon-a-after-clean.jpg";
        } else if (ltmCurrentMap === "快速直擊") {
          ltmPic =
            "https://www.ggrecon.com/media/fdykbobj/apexlegendsarenajpg.jpg";
        } else if (ltmCurrentMap === "破碎東方") {
          ltmPic =
            "https://metro.co.uk/wp-content/uploads/2022/12/fragment-apex-legends-d7c9.jpg?quality=90&strip=all";
        } else if (ltmCurrentMap === "氾濫") {
          ltmPic =
            "https://assets.gamepur.com/wp-content/uploads/2021/07/13150343/Overflow-map.jpg";
        } else if (ltmCurrentMap === "晴雨表") {
          ltmPic =
            "https://static.wikia.nocookie.net/apexlegends_gamepedia_en/images/d/d6/S11_stormpoint_barometer.png/revision/latest/scale-to-width-down/1200?cb=20211028182624";
        } else if (ltmCurrentMap === "腐蝕治療") {
          ltmPic = "https://pbs.twimg.com/media/FOn7MaCVQA4chi6.jpg:large";
        } else if (ltmCurrentMap === "4號實驗室") {
          ltmPic =
            "https://www.gamespot.com/a/uploads/original/1599/15997278/3926861-habitat2.jpg";
        }
        console.log(`當前地圖是：${ltmCurrentMap}`);
        console.log(`下一張地圖是：${ltmNextMap}`);
        console.log(`剩餘時間：${ltmLeftTime}`);
        console.log(`當前模式是：${ltmCurrentEvent}`);
        console.log(`下一個模式是：${ltmNextEvent}`);
        // console.log(`${ltmPic}`)
        interaction.reply(
          `當前地圖是：${ltmCurrentMap} ${ltmCurrentEvent}模式\n${ltmPic}\n地圖更換剩餘：${ltmLeftTime}\n下一張地圖是：${ltmNextMap} ${ltmNextEvent}模式`
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
