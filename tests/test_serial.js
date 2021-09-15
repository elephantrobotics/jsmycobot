import { portList } from '../serial.js';

portList().then(ports => console.log(ports))
