'use strict';

function calibration_parameters() {
    // console.log(arguments)
    var joint = [4, 6]
    if (arguments[3] < 0 || arguments[3] > 100) {
        let e = "The speed range is 0 ~ 100. the error speed is " + String(arguments[3])
        throw e
    }
    if (arguments[0] == "sendAngle") {
        let joint_id = [1, 2, 3, 4, 5, 6]
        if (joint_id.indexOf(arguments[1]) == -1) {
            let e = "SendAngleError: The id not right, should be 1 ~ 6, but received " + String(arguments[1] + ". Please input parameters according to the number of axes of the machine")
            throw e
        }
    } else if (arguments[0] == "sendAngles") {

        if (joint.indexOf(arguments[1]) == -1) {
            let e = "SendAngles: The length of `angles` must be 4 or 6."
            throw e
        }
    } else if (arguments[0] == "sendCoords") {
        let e = "SendCoordsError: "
        if (joint.indexOf(arguments[1]) == -1) {
            e += "The length of `coords` must be 4 or 6."
            throw e
        } else if ([0, 1].indexOf(arguments[4] == -1)) {
            e += "The mode is 0 or 1."
            throw e
        }
    } else if (arguments[0] == "getGripperValue") {
        let e = "GetGripperValueError: "
        if (arguments[1] != 0 && arguments[1] != 1) {
            e += "The states is 0 or 1. but received " + String(arguments[1])
            throw e
        }
    } else if (arguments[0] == "RGB") {
        let e = "SetColorError: "
        if (!(0 <= arguments[1] <= 255 && 0 <= arguments[2] <= 255 && 0 <= arguments[4] <= 255)) {
            e += "The RGB value needs be 0 ~ 255"
        }
    }

}


module.exports = { calibration_parameters }
