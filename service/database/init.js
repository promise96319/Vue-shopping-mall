const mongoose = require('mongoose')
const glob = require('glob')
const {
  resolve
} = require('path')

let maxConnectTimes = 0

mongoose.Promise = global.Promise


exports.connect = () => {
  mongoose.connect('mongodb://localhost/shopping-db')

  const db = mongoose.connection
  db.on('disconnected', () => {
    console.log('**********数据库已断开连接***********')
    if (maxConnectTimes < 3) {
      maxConnectTimes++
      mongoose.connect(db)
    } else {
      reject()
      throw new Error('数据库出现故障...')
    }
  })

  db.on('error', err => {
    console.log('**********数据库出错了***********')
    if (maxConnectTimes < 3) {
      maxConnectTimes++
      mongoose.connect(db)
    } else {
      reject(err)
      throw new Error('数据库出现故障...')
    }
  })

  db.once('open', () => {
    console.log('MongoDB Connected Successfully!')
  })
}

// exports.initSchema = () => {
//   glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
// }
