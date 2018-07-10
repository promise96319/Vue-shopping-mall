<template lang="html">
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="50%" />
    </div>
    <div class="goods-name">
      {{ goodsName }}
    </div>
    <div class="goods-price">
      ￥{{ goodsPrice | moneyFilter }}
    </div>
  </div>
</template>

<script>
import {
  toMoney
} from '@/filter/moneyFilter'

export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice'],
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
}
</script>

<style lang="css" scoped>
  .goods-name {
    padding: 0 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
