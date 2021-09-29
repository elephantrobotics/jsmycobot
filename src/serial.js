'use strict';

var SerialPort = require("serialport")

function portList() {
  return new Promise(function (resolve, reject) {
    SerialPort.list()
      .then((ports) => {
        resolve(ports);
      })
      .catch((err) => reject(err));
  });
}

// let serialPort = null;

function createSerial(portString, baud = 115200) {
  return new SerialPort(portString, { baudRate: baud });
}

module.exports = {
  createSerial,
  portList
}
