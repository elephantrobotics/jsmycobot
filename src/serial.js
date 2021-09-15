import SerialPort from "serialport";

export function portList() {
  return new Promise(function (resolve, reject) {
    SerialPort.list()
      .then((ports) => {
        resolve(ports);
      })
      .catch((err) => reject(err));
  });
}

// let serialPort = null;

export function createSerial(portString, baud) {
  return new SerialPort(portString, { baudRate: baud, autoOpen: false });
}
