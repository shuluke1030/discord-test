require("dotenv").config();

const uri = process.env.MONGODB_CONNECTION;

const { MongoClient } = require('mongodb');

async function connect(){
    const mongoClient = await MongoClient.connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch((err) => {
        console.log(`something went wrong: ${err}`);
        throw err;
      });
      console.log('connect success.');
    return mongoClient;
}

module.exports = { connect };

// let x = db.collection("Map").findOne();
// console.log(x);