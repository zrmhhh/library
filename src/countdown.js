/**
 *
 * @param {int} dateTim 时间戳
 */
function timeElapse(dateTim) {
  if (typeof dateTim !== 'number') return {};
  var days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  var current = Date();
  seconds = (Date.parse(current) - dateTim) / 1000;
  days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  seconds = Math.floor(seconds);
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return {
    days,
    hours,
    minutes,
    seconds
  };
}
