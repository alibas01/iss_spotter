// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error.message);
    return;
  }
  fetchCoordsByIP(ip, (err, coord) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`{ latitude: ${coord.latitude}, longitude: ${coord.longitude} }`);
  });
});

