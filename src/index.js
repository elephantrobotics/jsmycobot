'use strict';
var Comman = require("./common.js")
var utils = require("./utils.js")
var createSerial = require("./serial.js")
var error = require("./error")

// var serialobj = null

function connect(port = "", baud = 115200) {
  /**
   * 
   * @param {string} port Serial port number
   * @param {number} baud Baud rate
   * @return {object} returns a serial port object
   */
  return createSerial.createSerial(port, baud)
}

// 所有舵机上电
function powerOn() {
  /**
   * @description open communication with Atom.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.POWER_ON), "hex")
}
// 所以舵机掉电
function powerOff() {
  /**
   * @description close communication with Atom.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.POWER_OFF), "hex")
}
// 判断是否上电
function isPowerOn() {
  /**
   * @description Determine whether to power up.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.IS_POWER_ON), "hex")
}
// 放松所有关节
function releaseAllServos() {
  /**
   * @description Relax all joints.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.RELEASE_ALL_SERVOS), "hex")
}

function isControllerConnect() {
  return Buffer.from(utils.transToHexString(Comman.Command.IS_CONTROLLER_CONNECTED), "hex")
}

// 读取角度
function getAngles() {
  /**
   * @description Get the angle.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.GET_ANGLES), "hex")
}
// 发送单个角度
function sendAngle(id = 1, degree = 0, speed = 60) {
  /**
   * @description Send a single angle.
   * @param id Joint number
  * @param degree Joint angle
   * @param speed Moving speed
   */
  error.calibration_parameters("sendAngle", id, degree, speed)
  degree = Math.round(degree * 100)
  return Buffer.from(utils.transToHexString(Comman.Command.SEND_ANGLE, [id, degree, speed]), "hex")
}
// 发送所有角度
function sendAngles(angles, speed) {
  /**
   * @description Send all angles.
   * @param angles Array 
   * @param speed Moving speed
   */
  error.calibration_parameters("sendAngle", angles.length, 0, speed)
  for (let i = 0; i < angles.length; i++)
    angles[i] = Math.round(angles[i] * 100);
  return Buffer.from(utils.transToHexString(Comman.Command.SEND_ANGLES, [angles, speed]), "hex");
}
// 获取坐标
function getCoords() {
  /**
   * @description  Get coordinates.
   */
  return Buffer.from(utils.transToHexString(Comman.Command.GET_COORDS), "hex");
}
// 发送单个坐标
function sendCoord(id, coord, speed) {
  error.calibration_parameters("sendCoord", id, coord, speed)
  return Buffer.from(utils.transToHexString(Comman.Command.SEND_COORD, [id, [coord * 10], speed]), "hex");
}
// 发送所有坐标
function sendCoords(coords, speed, mode) {
  /**
   * @param coords  6-axis: [x,y,z,rx,ry,rz] or 4-axis: [x,y,z,θ]
   * @param speed 0-100
   * @param mode 0 or 1.
   */
  for (let i = 0; i < 3; i++)
    coords[i] = Math.round(coords[i] * 10);
  for (let i = 3; i < coords.length; i++)
    coords[i] = Math.round(coords[i] * 100);
  error.calibration_parameters("sendCoord", coords.length, 0, speed, mode)
  return Buffer.from(utils.transToHexString(Comman.Command.SEND_COORDS, [coords, speed, mode]), "hex");
}
// 程序暂停
function programPause() {
  return Buffer.from(utils.transToHexString(Comman.Command.PAUSE), "hex");
}
// 程序恢复
function programResume() {
  return Buffer.from(utils.transToHexString(Comman.Command.RESUME), "hex");
}
// 程序停止
function stop() {
  return Buffer.from(utils.transToHexString(Comman.Command.STOP), "hex");
}
// 是否到达点位
function isInPosition(data, flag) {
  /**
   * @return  0 : error position
   *          1 : right position 
   *          -1: error data
   */
  let data_list = []
  if (flag == 1) {
    for (let i = 0; i < data.length; i++) {
      if (i < 3) {
        data_list.push(data[i] * 10)
      } else {
        data_list.push(data[i] * 100)
      }
    }
  }
  else if (flag == 0) {
    for (let i = 0; i < data.length; i++) {
      data_list.push(data[i] * 100)
    }
  } else {
    throw "Parameter flag error, expected 0 or 1"
  }
  return Buffer.from(utils.transToHexString(Comman.Command.IS_IN_POSITION, [data_list, flag]), "hex");
}
// 关节控制
function jogAngle(joint_id, direction, speed) {
  return Buffer.from(utils.transToHexString(Comman.Command.JOG_ANGLE, [joint_id, direction, speed]), "hex");
}
// 坐标控制
function jogCoord(coord_id, direction, speed) {
  return Buffer.from(utils.transToHexString(Comman.Command.JOG_COORD, [coord_id, direction, speed]), "hex");
}

// jogstop
function jogStop() {
  return Buffer.from(utils.transToHexString(Comman.Command.JOG_STOP), "hex");
}
// 发送encoder值
function setEncoder(joint_id, encoder) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_ENCODER, [joint_id, encoder]), "hex");
}
// 读取encoder值
function getEncoder(joint_id) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_ENCODER, [joint_id]), "hex");
}
// 发送所有encoder
function setEncoders(encoders, speed) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_ENCODERS, [encoders, speed]), "hex");
}
// 读取所有encoder值
function getEncoders() {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_ENCODER), "hex");
}
// 读取速度
function getSpeed() {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_SPEED), "hex");
}
// 设置速度
function setSpeed(speed) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_SPEED, [speed]), "hex");
}
// 读取关节最小角度
function getJointMin(joint_id) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_JOINT_MIN_ANGLE, [joint_id]), "hex");
}
// 读取关节最大角度
function getJointMax(joint_id) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_JOINT_MAX_ANGLE, [joint_id]), "hex");
}
// 查看连接
function isServoEnable(servo_id) {
  return Buffer.from(utils.transToHexString(Comman.Command.IS_SERVO_ENABLE, [servo_id]), "hex");
}
// 查看是否都上电
function isAllServoEnable() {
  return Buffer.from(utils.transToHexString(Comman.Command.IS_ALL_SERVO_ENABLE), "hex");
}
// 设置舵机状态
function setServoData(servo_no, data_id, value) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_SERVO_DATA, [servo_no, data_id, value]), "hex");
}
// 读取舵机状态
function getServodata(servo_no, data_id) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_SERVO_DATA, [servo_no, data_id]), "hex");
}
// 设置舵机零点
function setServoCalibration(servo_no) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_SERVO_CALIBRATION, [servo_no]), "hex");
}
// 单个电机掉电
function releaseServo(servo_no) {
  return Buffer.from(utils.transToHexString(Comman.Command.RELEASE_SERVO, [servo_no]), "hex");
}
// 单个电机上电
function focusServo(servo_no) {
  return Buffer.from(utils.transToHexString(Comman.Command.FOCUS_SERVO, [servo_no]), "hex");
}
// 设置pinMode
function setPinMode(pin_no, pin_mode) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_PIN_MODE, [pin_no, pin_mode]), "hex");
}
// 设置io
function setDigitalOutput(pin_no, pin_signal) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_DIGITAL_OUTPUT, [pin_no, pin_signal]), "hex");
}
// 读取io
function getDigitalInput(pin_no) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_DIGITAL_INPUT, [pin_no]), "hex");
}
// 读取夹爪角度
function getGripperValue() {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_GRIPPER_VALUE), "hex");
}
// 设置夹爪模式
function setGripperState(flag, speed) {
  /**
   * @param flag 0 - open ; 1 - close
   * @param speed 0-100
   */
  error.calibration_parameters("getGripperValue", flag, 0, speed)
  return Buffer.from(utils.transToHexString(Comman.Command.SET_GRIPPER_STATE, [flag, speed]), "hex");
}
// 设置夹爪角度
function setGripperValue(value, speed) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_GRIPPER_VALUE, [value, speed]), "hex");
}
// 夹爪设置零点
function setGripperIni() {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_GRIPPER_INI), "hex");
}
// 检测gripper是否运动
function isGripperMving() {
  return Buffer.from(utils.transToHexString(Comman.Command.IS_GRIPPER_MOVING), "hex");
}

function setBasicOutput(pin_no, pin_signal) {
  return Buffer.from(utils.transToHexString(Comman.Command.SET_BASIC_OUTPUT, [pin_no, pin_signal]), "hex");
}

function getBasicOutput(pin_no) {
  return Buffer.from(utils.transToHexString(Comman.Command.GET_BASIC_INPUT, [pin_no]), "hex");
}
// 设置rgb颜色
function setColor(r, g, b) {
  error.calibration_parameters("RGB", r, g, 0, b)
  return Buffer.from(utils.transToHexString(Comman.Command.SET_COLOR, [r, g, b]), "hex");
}

module.exports = {
  connect,
  getAngles,
  processReceived: utils.processReceived,
  powerOn,
  powerOff,
  setBasicOutput,
  getBasicOutput,
  sendAngle,
  sendAngles,
  sendCoord,
  sendCoords,
  setColor,
  setDigitalOutput,
  setEncoder,
  setEncoders,
  getEncoders,
  setGripperIni,
  setGripperState,
  setGripperValue,
  setPinMode,
  setServoCalibration,
  setServoData,
  setSpeed,
  isAllServoEnable,
  isControllerConnect,
  isGripperMving,
  isInPosition,
  isPowerOn,
  isServoEnable,
  getGripperValue,
  focusServo,
  getDigitalInput,
  getCoords,
  getEncoder,
  releaseServo,
  getServodata,
  getJointMax,
  getJointMin,
  getSpeed,
  jogStop,
  jogCoord,
  jogAngle,
  stop,
  programResume,
  programPause,
  releaseAllServos
}
