var lastArray = [];
module.exports = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    var value = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    while(lastArray.includes(value)){
        value = Math.floor(Math.random() * (max - min)) + min;
    }
    lastArray.push(value);
    if(lastArray.length > max/4)lastArray.shift();
    return value;
}