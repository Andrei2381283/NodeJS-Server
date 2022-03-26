module.exports = function(date_){
    if(typeof date_ == "string"){
        const splited = date_.split(".");
        return new Date(Number(splited[2]), Number(splited[1]), Number(splited[0]), 0, 0, 0, 0);
    }
    const date =  typeof date_ == "number" ? new Date(date_) : date_ || new Date();
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    return newDate;
}