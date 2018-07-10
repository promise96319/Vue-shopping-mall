const Router = require('koa-router')
const mongoose = require('mongoose')
const {
  connect
} = require('../database/init.js')
const User = require('../database/schema/user.js')
let router = new Router()


router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})

//注册
router.post('/register', async (ctx) => {

  // ;(async () => {

  await connect()

  let newUser = new User(ctx.request.body)

  console.log('=============');
  console.log(newUser);

  await newUser.save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '注册成功'
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })

  // })()

})


// 登录
router.post('/login', async (ctx) => {
      let loginUser = ctx.request.body
      let username = loginUser.username
      let password = loginUser.password

      await connect()

      console.log('开始了');

      await User.findOne({
          username: username
        })
        .then(async (result) => {
            if (result) {
              let newUser = new User()
              await newUser.comparePassword(password, result.password)
                .then((isMatch) => {
                  console.log('登录成功');
                  ctx.body = {
                    code: 200,
                    message: isMatch
                  }
                })
                .catch((error) => {
                  ctx.body = {
                    code: 500,
                    message: error
                  }
                })
            } else {
              ctx.body = {
                code: 204,
                message: '用户名不存在'
              }
            }
          }).catch(error => {
          console.log(3);
            ctx.body = {
              code: 500,
              message: error
            }
        })
      })


    module.exports = router
