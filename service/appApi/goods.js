
const Router = 'koa-router'

const mongoose = require('mongoose')
const {
  connect
} = require('../database/init.js')
const Goods = require('../database/schema/goods.js')
const fs = require('fs')

let router = new Router()

router.get('/insertAllGoodsInfo', async (ctx) => {
  await connect()
  fs.readFile('./goods.json', 'uft8', (err, data) => {
    data = JSON.parse(data)
    console.log(data);
    let saveCount = 0

    data.map((item, index) => {
      let newGoods = new Goods(item)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount);
      }).catch(err => {
        console.log('失败' + err);
      })
    })
  })

  ctx.body = '开始导入数据'

})

module.exports = router
