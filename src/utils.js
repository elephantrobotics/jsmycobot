'use strict';

var Comman = require('./common.js')

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function handleData(value) {
  let temp;
  if (value < 0)
    temp = (65536 + value).toString(16);
  else
    temp = value.toString(16);
  return temp.length == 4 ? temp : '0'.repeat(4 - temp.length) + temp;
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2));
}

function transToHexString(genre, commands = []) {
  let result = "";
  let temp;
  commands.forEach(item => {
    if (isArray(item)) {
      item.forEach(i => {
        result += handleData(i)
      });
    } else {
      temp = item.toString(16);
      result += temp.length == 2 ? temp : '0' + temp;
      // result.push(item);
    }

  });
  let commandLen = (parseInt(result.length / 2) + 2).toString(16);
  let lenStr = commandLen.length == 2 ? commandLen : '0' + commandLen;
  return Comman.Command.HEADER + Comman.Command.HEADER + lenStr + genre + result + Comman.Command.FOOTER;
}

function processReceived(buf) {
  let hexArr = buf2hex(buf);
  /**
   * Looking for valid data from the received data. Like:
   *  '  fe     fe     0e    20'
   *   header header length type
   */
  let genre, len, index;
  for (let i = 0; i < hexArr.length; ++i) {
    if (hexArr[i] == 'fe' && hexArr[i + 1] == 'fe') {
      len = parseInt(hexArr[i + 2], 16) - 2;
      genre = hexArr[i + 3];
      index = i + 4;
    }
  }
  if (genre === undefined || len === undefined)
    return [null, null];
  // Trans hex string to data int.
  let dataRes = [];
  let tempArr = hexArr.slice(index, index + len);
  var d
  switch (len) {
    case 8:
    case 12:
      for (let i = 0; i < tempArr.length; i += 2) {
        d = parseInt(tempArr[i] + tempArr[i + 1], 16);
        dataRes.push(d > 33000 ? d - 65536 : d);
      }
      break;
    case 2:
      if (genre == Comman.Command.IS_SERVO_ENABLE) {
        d = parseInt(tempArr[0] + tempArr[1], 8);
        dataRes.push(d > 33000 ? d - 65536 : d)
        break
      }
      d = parseInt(tempArr[0], 16);
      dataRes.push(d > 33000 ? d - 65536 : d)
      break
    case 1:
      d = parseInt(tempArr[0], 8);
      dataRes.push(d > 33000 ? d - 65536 : d);
      break
    default:
      dataRes = null;
      break;
  }
  // Process data to readable.
  genre = genre.toUpperCase()
  switch (genre) {
    case Comman.Command.GET_ANGLES:
      for (let i = 0; i < dataRes.length; ++i)
        dataRes[i] /= 100;
      break;

    case Comman.Command.GET_COORDS:
      for (let i = 0; i < 3; ++i)
        dataRes[i] /= 10;
      for (let i = 3; i < dataRes.length; ++i)
        dataRes[i] /= 100;
      break;

    case Comman.Command.IS_POWER_ON:
      dataRes = dataRes[0]
      break

    default:
      break;
  }
  return dataRes;
}

module.exports = {
  transToHexString,
  processReceived
}
