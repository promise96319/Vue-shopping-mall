<template>
<div class="root">
  <router-link to="/login">登录</router-link>
  <router-link to="/register">注册</router-link>
  <!-- 导航栏 -->
  <div class="search-bar">
    <van-row gutter="5">
      <van-col span="3" class="location">
        <img :src="locationIcon" class="location-icon">
      </van-col>

      <van-col span="16" class="search">
        <input type="text" class="search-input" placeholder="请输入搜索内容...">
        <img :src="searchIcon" alt="" class="search-icon">
      </van-col>

      <van-col span="5">
        <button class="search-button">搜索</button>
      </van-col>
    </van-row>
  </div>

  <!-- 轮播图 -->
  <div class="swiper-area">
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
        <img width="100%" alt="" v-lazy="banner.image">
      </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 分类区 -->
  <div class="type-bar">
    <div v-for="(cate, index) in category" :key="index">
      <img v-lazy="cate.image" width="80%">
      <span>{{ cate.mallCategoryName }}</span>
    </div>
  </div>

  <!-- 广告区 -->
  <div class="ad-banner">
    <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
  </div>

  <!-- 商品推荐区 -->
  <div class="recommend-area">
    <div class="recommend-title">
      商品推荐
    </div>
    <div class="recommend-body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
          <div class="recommend-item">
            <img v-lazy="item.image" :title="item.goodsName" width="80%">
            <!-- <div>
              {{ item.goodsName }}
            </div> -->
            <div>
              <span class="price">￥{{ item.price | moneyFilter }}</span><br />
              <span class="mallPrice"><del>￥{{ item.mallPrice | moneyFilter }}</del></span>
            </div>
          </div>
        </swiper-slide>
        <div class="swipe-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>

  <!-- 三层 -->
  <div class="three-floor">
    <floor-component :floorData="floor1" :floorTitle="floorTitle.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorTitle.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorTitle.floor3"></floor-component>
  </div>

  <!-- 热卖商品 -->
  <div class="hot-area">
    <div class="hot-title">
      热卖商品
    </div>

    <div class="hot-goods">
      <van-list>
        <van-row gutter="10">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>

</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import floorComponent from '@/components/floorComponent'
import {
  toMoney
} from '@/filter/moneyFilter'
import goodsInfoComponent from '@/components/goodsInfoComponent'

export default {
  data() {
    return {
      locationIcon: require('../../assets/images/location.svg'),
      searchIcon: require('../../assets/images/search.svg'),
      bannerPicArray: [{
          imgUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'
        },
        {
          imgUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'
        },
        {
          imgUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'
        }
      ],
      category: {},
      adBanner: {},
      bannerPicArray: {},
      recommendGoods: [],
      swiperOption: {
        // direction: 'vertical',
        slidesPerView: 3,
        freeMode: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          // clickable: true
        }
      },
      floor1: [],
      floor2: [],
      floor3: [],
      // floor1_0: {},
      // floor1_1: {},
      // floor1_2: {}
      floorTitle: [],
      hotGoods: []
    }
  },
  created() {
    this.$axios.get(' https://www.easy-mock.com/mock/5b42b958fe23070c51e5235c/example/vue')
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture
          this.bannerPicArray = res.data.data.slides
          this.recommendGoods = res.data.data.recommend

          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          // this.floor1_0 = this.floor1[0]
          // this.floor1_1 = this.floor1[1]
          // this.floor1_2 = this.floor1[2]
          this.floorTitle = res.data.data.floorName
          this.hotGoods = res.data.data.hotGoods
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfoComponent
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
}
</script>


<style lang="css" scoped>
  /* * {
   font-size: 0.6rem;
  } */

  .root > div {
    width: 20rem;
  }

  /* 搜索栏 */
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
    font-size: 0.6rem;
  }

  .location {
    padding-top: 0.3rem;
    height: 2.2rem;
  }

  .location-icon {
  height: 1.6rem;
  }

  .search {
    position: relative;
  }

  .search-input {
    box-sizing: border-box;
    color: #333;
    height: 1.4rem;
    width: 100%;
    border: none;
    border-radius: 0.7rem;
    padding-left: 1.4rem;
  }

  .search-icon {
    position: absolute;
    left: 0.4rem;
    width: 1rem;
    height: 1rem;
    top: 0.6rem;
  }

  .search-button {
    margin-top: 0.4rem;
    width: 2.8rem;
    height: 1.4rem;
    line-height: 1.2rem;
  }

  /* 轮播图 */
  .swiper-area {
    overflow: hidden;
    clear: both;
  }


  /* 分类栏 */
  .type-bar{
       background-color: #fff;
       margin: 0 0 .3rem;
       border-radius: .3rem;
       font-size: 0.6rem;
       display: flex;
       flex-direction: row;
       flex-wrap: nowrap;
       justify-content: center;
   }
   .type-bar div{
       padding: .4rem;
       text-align: center;
       flex:1;
   }


  /* 推荐商品  */
  .recommend-area {
    background-color: #fff;
    margin-top: 0.3rem;
  }


  .recommend-title {
    text-align: left;
    border-bottom: 1px solid #eee;
    color: #e5017d;
    padding: 0.2rem;
    font-size: 0.8rem;
  }

  .recommend-body {
    border-bottom: 1px solid #eee
  }

  .recommend-item {
    width: 100%;
    border-right: 1px solid #eee;
    text-align: center;
    line-height: 0.8rem;
    padding: 0.3rem 0;
  }

  .recommend-item .price {
    color: red;
    font-size: 0.7rem;
  }

  .recommend-item .mallPrice {
    color: #ccc;
    font-size: 0.5rem;
  }

  /* 热卖专区 */

.hot-area {
  text-align: center;
  font-size: 0.5rem;
  line-height: 1.4rem;
  clear: both;
  background-color: #fff;
}

.hot-title {
  font-size: 0.8rem;
  color: #e5017d;
}


</style>
