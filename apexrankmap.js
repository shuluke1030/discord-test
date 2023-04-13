const axios = require("axios");

async function getRankedMap(apexDatabase) {
  const config = {
    method: "get",
    url: 'https://api.mozambiquehe.re/maprotation?version=17d9345d26bb3b916cf7085f22d81b2cc',
    headers: { 
    Authorization: '7d9345d26bb3b916cf7085f22d81b2cc'
    }
  };

  try {
    const response = await axios(config);
    const rankedCurrentMap = response.data.ranked.current.map;
    const rankedMapPng = response.data.ranked.current.asset;
    const rankedNextMap = response.data.ranked.next.map;
    const rankedLeftTime = response.data.ranked.current.remainingTimer;

    // console.log(`當前地圖是：${rankedCurrentMap}`);
    // console.log(`${rankedMapPng}`);
    // console.log(`下一張地圖是：${rankedNextMap}`);
    // console.log(`剩餘時間：${rankedLeftTime}`);

    

    const { translation: rankTranslationMap } = await apexDatabase
      .collection("Map")
      .findOne({ title: rankedCurrentMap });

    const { translation: nextRankedMapTranslation } = await apexDatabase
      .collection("Map")
      .findOne({ title: rankedNextMap });

    const reply = `當前地圖是：${rankTranslationMap}\n${rankedMapPng}\n地圖更換剩餘：${rankedLeftTime}\n下一張地圖是：${nextRankedMapTranslation}`;
    console.log(`reply content: ${reply}`);
    return (reply)
  } catch (error) {
    console.log(error);
    return `抱歉，獲取地圖資訊時出現錯誤`;
  }
}

module.exports = { getRankedMap };
