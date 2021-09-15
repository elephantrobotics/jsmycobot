import { Command } from './common.js';

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

export function transToHexString(genre, commands = []) {
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
  let commandLen = (result.length / 2 + 2).toString(16);
  let lenStr = commandLen.length == 2 ? commandLen : '0' + commandLen;
  console.log('command:', Command.HEADER + Command.HEADER + lenStr + genre + result + Command.FOOTER)
  return Command.HEADER + Command.HEADER + lenStr + genre + result + Command.FOOTER;
}

export function processReceived(buf) {
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
  let dataRes;
  let tempArr;
  switch (len) {
    case 8:
    case 12:
      tempArr = hexArr.slice(index, index + len);
      dataRes = [];
      for (let i = 0; i < tempArr.length; i += 2) {
        let d = parseInt(tempArr[i] + tempArr[i + 1], 16);
        dataRes.push(d > 33000 ? d - 65536 : d);
      }
      break;

    default:
      dataRes = null;
      break;
  }
  // Process data to readable.
  genre = genre.toUpperCase()
  switch (genre) {
    case Command.GET_ANGLES:
      for (let i = 0; i < dataRes.length; ++i)
        dataRes[i] /= 100;
      break;

    case Command.GET_COORDS:
      for (let i = 0; i < 3; ++i)
        dataRes[i] /= 10;
      for (let i = 3; i < dataRes.length; ++i)
        dataRes[i] /= 100;
      break;

    default:
      break;
  }

  return [dataRes, genre];
}


