const Koa = require('koa')
const app = new Koa()

// const mongoose = require('mongoose')
// const {connect, initSchema} = require('./database/init.js')
// const bcrypt = require('bctypt')

const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
app.use(cors())
app.use(bodyParser())

const Router = require('koa-router')
let router = new Router()

let users = require('./appApi/router.js')
let goods = require('./appApi/goods.js')


router.use('/user', users.routes())
router.use('/goods', goods.routes())

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, () => {
  console.log('server is running at port 3000')
})
