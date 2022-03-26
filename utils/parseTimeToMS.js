const map = [60*60, 60, 1];

module.exports = function(time){
    return time.split(":").map((value, index) => Number(value)*map[index]).reduce((pv, cv) => Number(pv) + Number(cv))*1000;
}