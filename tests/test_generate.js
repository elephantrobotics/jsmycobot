import { getAnglesCommand, sendAnglesCommand, setColorCommand } from '../generate.js'

console.log(setColorCommand(255, 0, 0))

console.log(sendAnglesCommand([1, 1, 1, 1, 1, 1], 0))

console.log(getAnglesCommand())
