const parseTimeToMS = require("./parseTimeToMS");
const getCurrentTimeMS = require("./getCurrentTimeMS");
const parseMSToTime = require("./parseMSToTime");

const devideMap = {
    sec: 1000,
    min: 1000*60,
    hour: 1000*60*60
};

module.exports = function(pricesModels, domainModel){
    const timesMap = {};
    const times = pricesModels
    .map(value => {
        const parsedTime = parseTimeToMS(value.time);
        timesMap[timesMap] = value;
        return parsedTime;
    })
    .sort((a,b) => a - b);
    const bill = [];
    const currentTimeMS = getCurrentTimeMS();
    times.forEach((element, index) => {
        if(currentTimeMS >= element){
            const startTime = parseMSToTime(element);
            const endTime = times[index + 1] ? (currentTimeMS >= times[index + 1] ? parseMSToTime(times[index + 1]) : parseMSToTime(currentTimeMS)) : parseMSToTime(currentTimeMS);
            const fullPrice = timesMap[element].cost*Math.round((endTime - startTime)/devideMap[domainModel.unit_time]);
            const fixLength = domainModel.rounding%1 ? domainModel.rounding.toString().substr(domainModel.rounding.toString().indexOf(".") + 1).length : 0;
            const endPrice = domainModel.rounding*Math.round(Number(fullPrice.toFixed(fixLength))/domainModel.rounding);
            bill.push({type: 'item', data:[startTime, endTime, timesMap[element].cost, endPrice]});
        }
    });
    return bill;
}