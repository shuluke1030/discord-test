var axios = require('axios');

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
  for(let i = 0; i < response.data[0].bundleContent.length; i++){
    console.log(JSON.stringify(response.data[0].bundleContent[i].itemType.name))
    console.log(JSON.stringify(response.data[0].bundleContent[i].itemType.asset))
  };
})
.catch(function (error) {
  console.log(error);
});




