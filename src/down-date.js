/**
 * 
 * @param {int} dateTim 
 */
function timeElapse(dateTim){
  var current = Date();
  var seconds = (Date.parse(current) - dateTim) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  seconds = seconds % 60;
  seconds = Math.floor(seconds);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return {
    days,
    hours,
    minutes,
    seconds
  }
  // return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
}