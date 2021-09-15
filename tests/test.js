import '../index.js';
import { getAnglesCommand, sendAnglesCommand, setColorCommand } from "../generate.js";
import { createSerial } from "../serial.js";
import { processReceived } from "../utils.js";
import { portList } from "../serial.js";

function sleep(milliSeconds) {
  var startTime = new Date().getTime(); // get the current time
  while (new Date().getTime() < startTime + milliSeconds);
}

let port = createSerial(
  '/dev/tty.usbserial-02168C87', 115200
)

port.on('data', (data) => {
  console.log(processReceived(data))
});

// port.on('readable', function () {
// 	console.log('Data:', port.read(1024))
// })

// port.write(Buffer.from(setColorCommand(255, 0, 0), 'hex'))
// port.write(Buffer.from(sendAnglesCommand([0, 0, 0, 0, 0, 0], 80), 'hex'))
port.write(Buffer.from(getAnglesCommand(), 'hex'))
console.log(port.read())
// sleep(1000)



