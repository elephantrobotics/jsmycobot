import { Command } from "./common.js";
import { transToHexString } from "./utils.js";

export function powerOn() {
  return transToHexString(Command.POWER_ON)
}

export function getAngles() {
  return transToHexString(Command.GET_ANGLES);
}

export function sendAngles(angles, speed) {
  for (let i = 0; i < angles.length; i++)
    angles[i] = Math.round(angles[i] * 100);
  process.env.NODE_ENV === "development" && console.log("angles:", angles)
  return transToHexString(Command.SEND_ANGLES, [angles, speed]);
}

export function getCoords() {
  return transToHexString(Command.GET_COORDS);
}

export function sendCoords(coords, speed, model) {
  for (let i = 0; i < 3; i++)
    coords[i] = Math.round(coords[i] * 10);
  for (let i = 3; i < coords.length; i++)
    coords[i] = Math.round(coords[i] * 100);
  return transToHexString(Command.SEND_COORDS, [coords, speed, model]);
}

export function setColor(r, g, b) {
  return transToHexString(Command.SET_COLOR, [r, g, b]);
}

