const {connect} = require("./mongodb.js");

async function test() {
    mongodbClient = await connect();
    const data = await mongodbClient.db('Apex').collection('Map').find();
    // console.log(data);
}
