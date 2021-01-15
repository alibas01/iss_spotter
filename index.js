// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error.message);
    return;
  }
  //console.log(ip);
  fetchCoordsByIP(ip, (err, coord) => {
    if (err) {
      console.log(err.message);
      return;
    }
    let obj = {latitude : coord.latitude, longitude : coord.longitude};
    
    //console.log(obj);
    fetchISSFlyOverTimes(obj.latitude, obj.longitude, (erro, times) => {
      if (erro) {
        console.log(erro.message);
        return;
      }
      //console.log(times.response);
      //nextISSTimesForMyLocation((er, passTimes) => {
      //if(er) {
      //console.log(er.message);
      //return;
      // }
      for (const pass of times.response) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
      }
    //});
    });
  });
});


