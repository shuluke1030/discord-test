require("dotenv").config();
const {Client, GatewayIntentBits, time, AttachmentBuilder} = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
var axios = require("axios");
const mergeImg = require("merge-img");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const { apexCrafting } = require("./apexcrafting");
const { getMixTapeMap } = require("./apexmixtape");
const { getRankedMap } = require("./apexrankmap");
const { getCurrentMap } = require("./apexmap");
const { connect } = require("./mongodb.js");
let apexDatabase = {};

client.on("ready", async () => {
  
  let mongoClient = await connect();
  apexDatabase = mongoClient.db('Apex');
  console.log(`Logged in as ${client.user.tag}!`);
});


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

  if (interaction.commandName === "timing") {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    interaction.reply(`現在時間是：${hours}:${minutes}`);
  }

  //apexmap 完成
  if (interaction.commandName === "apexmap") {
    const currentMapInfo = await getCurrentMap(apexDatabase); // get current map
    await interaction.reply(currentMapInfo);
  }
  //apexcrafting完成
  if (interaction.commandName === "apexcrafting") {

    await apexCrafting(interaction);
    
  }
  //apexmixtape完成
  if (interaction.commandName === "apexmixtape") {

    const mixTapeMapInfo = await getMixTapeMap(apexDatabase);
    await interaction.reply(mixTapeMapInfo);
  }
  //apexranked完成
  if (interaction.commandName === "apexranked") {

    const rankedMapInfo = await getRankedMap(apexDatabase);
    await interaction.reply(rankedMapInfo);
  }

});

client.login(process.env.DISCORD_TOKEN);
app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});