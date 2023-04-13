// var axios = require('axios');

// var config = {
//   method: 'get',
// maxBodyLength: Infinity,
//   url: 'https://api.mozambiquehe.re/maprotation',
//   headers: { 
//     'Authorization': '7d9345d26bb3b916cf7085f22d81b2cc'
//   }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data.current.map));
// })
// .catch(function (error) {
//   console.log(error);
// });
//============================================================================================
//version=1
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.mozambiquehe.re/maprotation?version=17d9345d26bb3b916cf7085f22d81b2cc',
  headers: { 
    'Authorization': '7d9345d26bb3b916cf7085f22d81b2cc'
  }
};

axios(config)
.then(function (response) {
console.log(JSON.stringify(response.data.ranked.current.map))
console.log(JSON.stringify(response.data.ranked.current.remainingTimer))
console.log(JSON.stringify(response.data.ranked.next.map))
console.log(JSON.stringify(response.data.ranked.current.asset))
})
.catch(function (error) {
  console.log(error);
});

