const axios = require("axios");
const mergeImg = require("merge-img");
const fs = require("fs");
const { AttachmentBuilder } = require("discord.js");

function mergeImage(aImageUrl, bImageUrl) {
  return new Promise((resolve, reject) => {
    mergeImg([aImageUrl, bImageUrl], { direction: false, offset: 5 })
      .then((img) => {
        img.write("./output.png", () => {
          console.log(`圖片已經成功保存到 ${"./output.png"}`);
          resolve("./output.png");
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteLocalImage() {
  fs.unlink("./output.png", (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`已經成功刪除檔案 ./output.png`);
  });
}

async function apexCrafting(interaction) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.mozambiquehe.re/crafting?7d9345d26bb3b916cf7085f22d81b2cc",
    headers: {
      Authorization: "7d9345d26bb3b916cf7085f22d81b2cc",
    },
  };

  try {
    const response = await axios(config);
    const items = [];
    const itemUrls = [];
    for (let i = 0; i < response.data[0].bundleContent.length; i++) {
      items.push(response.data[0].bundleContent[i].itemType.name);
      itemUrls.push(response.data[0].bundleContent[i].itemType.asset);
    }
    console.log(`當日合成物品：${items}`);

    await mergeImage(itemUrls[0], itemUrls[1]);
    const attachment = new AttachmentBuilder("./output.png");
    await interaction.reply({
      content: "當日合成物品：",
      files: [attachment],
    });
    deleteLocalImage();
  } catch (error) {
    console.log(error);
    return interaction.reply(`抱歉，獲取合成物品資訊時出現錯誤`);
  }
}

module.exports = { apexCrafting };
