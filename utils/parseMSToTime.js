function getRemTime(ms){
    var remSeconds = Math.floor(ms/1000);
    var remMinutes = Math.floor(remSeconds/60);
    var remHours = Math.floor(remMinutes/60);
    return {
        remHours: remHours%24,
        remMinutes: remMinutes%60,
        remSeconds: remSeconds%60
    }
}

module.exports = function(ms){
    const remTime = getRemTime(ms)
    return `${remTime.remHours}:${remTime.remMinutes}:${remTime.remSeconds}`;
}