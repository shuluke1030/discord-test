const axios = require("axios");

async function getMixTapeMap(apexDatabase){
    const config = {
        method: "get",
        url: 'https://api.mozambiquehe.re/maprotation?version=17d9345d26bb3b916cf7085f22d81b2cc',
        headers: { 
        Authorization: '7d9345d26bb3b916cf7085f22d81b2cc'
        }
      };
  
      try{
          const response = await axios(config);
          const ltmCurrentMap = response.data.ltm.current.map;
          const ltmNextMap = response.data.ltm.next.map;
          const ltmLeftTime = response.data.ltm.current.remainingTimer;
          const ltmCurrentEvent = response.data.ltm.current.eventName;
          const ltmNextEvent = response.data.ltm.next.eventName;
  
          // console.log(`當前地圖是：${ltmCurrentMap}`);
          // console.log(`下一張地圖是：${ltmNextMap}`);
          // console.log(`剩餘時間：${ltmLeftTime}`);
          // console.log(`當前模式是：${ltmCurrentEvent}`);
          // console.log(`下一個模式是：${ltmNextEvent}`);

        
          const { translation: ltmTranslation} = await apexDatabase
          .collection("Map")
          .findOne({ title: ltmCurrentMap });
  
          const { Png: ltmPng} = await apexDatabase
          .collection("Map")
          .findOne({ title: ltmCurrentMap});
  
          const { translation: CurrentEvent} = await apexDatabase
          .collection("Event")
          .findOne({ title: ltmCurrentEvent});
  
          const { translation: ltmNextMapTranslation } = await apexDatabase
          .collection("Map")
          .findOne({ title: ltmNextMap });
          
          const { translation: NextEvent} = await apexDatabase
          .collection("Event")
          .findOne({ title: ltmNextEvent});

          const reply = `當前地圖是：${ltmTranslation} ${CurrentEvent}模式\n${ltmPng}\n地圖更換剩餘：${ltmLeftTime}\n下一張地圖是：${ltmNextMapTranslation} ${NextEvent}模式`
          console.log(`reply content: ${reply}`);
          return (reply)
        }catch (error) {
          console.log(error);
          return `抱歉，獲取地圖資訊時出現錯誤`;
        };
}

module.exports = { getMixTapeMap };