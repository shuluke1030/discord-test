const axios = require("axios");

async function getCurrentMap(apexDatabase) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.mozambiquehe.re/maprotation",
    headers: {
      Authorization: "7d9345d26bb3b916cf7085f22d81b2cc",
    },
  };

  try {
    const response = await axios(config);
    const currentMap = response.data.current.map;
    const mapPng = response.data.current.asset;
    const nextMap = response.data.next.map;
    const leftTime = response.data.current.remainingTimer;

    console.log(`當前地圖是：${currentMap}`);
    console.log(`${mapPng}`);
    console.log(`下一張地圖是：${nextMap}`);
    console.log(`剩餘時間：${leftTime}`);

    const { translation } = await apexDatabase
      .collection("Map")
      .findOne({ title: currentMap });

    const { translation: nextMapTranslation } = await apexDatabase
      .collection("Map")
      .findOne({ title: nextMap });

    const reply = `當前地圖是：${translation}\n${mapPng}\n地圖更換剩餘：${leftTime}\n下一張地圖是：${nextMapTranslation}`;
    console.log(`reply content: ${reply}`);
    
    return (reply);
  } catch (error) {
    console.log(error);
    return (`抱歉，獲取地圖資訊時出現錯誤`);
  }
}

module.exports = { getCurrentMap };
