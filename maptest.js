var axios = require('axios');

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
  console.log(JSON.stringify(response.data.current.map));
})
.catch(function (error) {
  console.log(error);
});
