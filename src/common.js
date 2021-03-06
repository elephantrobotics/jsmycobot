const Command = {
  // BASIC
  HEADER: "FE",
  FOOTER: "FA",

  // System status
  VERSION: "00",

  // Overall status
  POWER_ON: "10",
  POWER_OFF: "11",
  IS_POWER_ON: "12",
  RELEASE_ALL_SERVOS: "13",
  IS_CONTROLLER_CONNECTED: "14",
  READ_NEXT_ERROR: "15",
  SET_FREE_MODE: "1A",
  IS_FREE_MODE: "1B",

  // MDI MODE AND OPERATION
  GET_ANGLES: "20",
  SEND_ANGLE: "21",
  SEND_ANGLES: "22",
  GET_COORDS: "23",
  SEND_COORD: "24",
  SEND_COORDS: "25",
  PAUSE: "26",
  IS_PAUSED: "27",
  RESUME: "28",
  STOP: "29",
  IS_IN_POSITION: "2A",
  IS_MOVING: "2B",

  // JOG MODE AND OPERATION
  JOG_ANGLE: "30",
  JOG_COORD: "32",
  JOG_STOP: "34",
  SET_ENCODER: "3A",
  GET_ENCODER: "3B",
  SET_ENCODERS: "3C",

  // RUNNING STATUS AND SETTINGS
  GET_SPEED: "40",
  SET_SPEED: "41",
  GET_FEED_OVERRIDE: "42",
  GET_ACCELERATION: "44",
  GET_JOINT_MIN_ANGLE: "4A",
  GET_JOINT_MAX_ANGLE: "4B",

  // SERVO CONTROL
  IS_SERVO_ENABLE: "50",
  IS_ALL_SERVO_ENABLE: "51",
  SET_SERVO_DATA: "52",
  GET_SERVO_DATA: "53",
  SET_SERVO_CALIBRATION: "54",
  RELEASE_SERVO: "56",
  FOCUS_SERVO: "57",

  // ATOM IO
  SET_PIN_MODE: "60",
  SET_DIGITAL_OUTPUT: "61",
  GET_DIGITAL_INPUT: "62",
  SET_PWM_MODE: "63",
  SET_PWM_OUTPUT: "64",
  GET_GRIPPER_VALUE: "65",
  SET_GRIPPER_STATE: "66",
  SET_GRIPPER_VALUE: "67",
  SET_GRIPPER_INI: "68",
  IS_GRIPPER_MOVING: "69",
  SET_COLOR: "6A",

  // Basic
  SET_BASIC_OUTPUT: "A0",
  GET_BASIC_INPUT: "A1"
}

const Angle = {
  Joint1: 1,
  Joint2: 2,
  Joint3: 3,
  Joint4: 4,
  Joint5: 5,
  Joint6: 6,
}

const Coord = {
  X: 1,
  Y: 2,
  Z: 3,
  Rx: 4,
  Ry: 5,
  Rz: 6,
}

module.exports = {
  Command,
  Angle,
  Coord
}
