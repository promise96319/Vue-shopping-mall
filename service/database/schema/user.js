const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
// let ObjectId = Schema.Types.ObjectId
// userId: ObjectId,

const userSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
})

//密码加密
let SALT_WORK_FACTOR = 5
userSchema.pre(('save'), function(next) {
  let user = this

  //产生密码hash当密码有更改的时候(或者是新密码)
  if (!user.isModified('password')) {
    return next()
  }

  // 产生一个salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {

    if (err) {
      return next(err)
    }

    // 结合salt产生新的hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      // 使用hash覆盖明文密码
      user.password = hash
      next()
    })
  })
})


//验证密码
userSchema.methods = {
  //客户端传过来的密码和数据库中的密码
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) {
          return reject(err)
        }
        return resolve(isMatch)
      })
    })
  }
}



module.exports = mongoose.model('User', userSchema)
