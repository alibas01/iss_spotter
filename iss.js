const request = require('request');

const fetchMyIP = function(callback) {
  
  const URL = 'https://api.ipify.org?format=json';
  //const URL = "https://freegeoip.app/json/invalidIPHere" // invalid ip
  request(URL, (error, response, body) => {
    if (error) {
      //console.log("Please check the URL!");
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IPResponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ipV4 = JSON.parse(body);
    callback(null, ipV4.ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  
  const URL = `https://freegeoip.app/json/${ip}`;
  //const URL = "https://freegeoip.app/json/invalidIPHere" // invalid ip
  request(URL, (error, response, body) => {
    if (error) {
      //console.log("Please check the URL!");
      callback(error.message, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP.   Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let geo = JSON.parse(body);
    callback(null, geo);
    return;
  });
};



module.exports = {fetchMyIP, fetchCoordsByIP};