
var mycobot = require("../src/index")

var obj = mycobot.connect("COM15", 115200)

// 发送指令

// obj.write(mycobot.powerOn())
// obj.write(mycobot.powerOff())
// obj.write(mycobot.isPowerOn())
// obj.write(mycobot.releaseAllServos())
// obj.write(mycobot.getAngles())
obj.write(mycobot.sendAngle(1, 100, 50))
// obj.write(mycobot.getCoords())
// obj.write(mycobot.sendCoord())
// obj.write(mycobot.isInPosition([0, 0, 0, 0, 0, 0], 0))
// obj.write(mycobot.jogAngle(1, 0, 20))

// obj.write(mycobot.setGripperState(2, 60))
// obj.write(mycobot.getGripperValue())

// obj.write(mycobot.setColor(100, 100, 100))
// 监听并接收数据
obj.on("data", (data) => {
  // console.log(data)
  // 数据转换
  res = mycobot.processReceived(data)
  console.log("res:", res)
  console.log(typeof res)
  console.log(res[0])
  // 关闭连接
  obj.close()
})
// console.log(dat)