module.exports = function(){
    var str = "";
    for(var i = 0; i < 4; i++){
        str += Math.floor(Math.random() * 10);
    }
    return str;
}