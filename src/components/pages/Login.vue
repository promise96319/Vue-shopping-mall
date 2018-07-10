<template lang="html">
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      ></van-field>

      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      ></van-field>

      <div class="register-button">
        <van-button type="primary" :loading="openLoading" size="large" @click="loginAction">立即登录</van-button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {
  Toast
} from 'vant'

export default {
  data() {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    axiosLoginUser() {

      // this.openLoading = true

      axios({
          url: url.loginUser,
          method: 'post',
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            new Promise((resolve, reject) => {
                localStorage.userInfo = {
                  username: this.username
                }
                setTimeout(() => {
                  resolve()
                }, 500)
              })
              .then(() => {
                Toast.success('登录成功')
                this.$router.push('/')
              })
              .catch(err => {
                Toast.fail('登录状态保存失败')
                console.log(err)
              })
            // Toast.success('登录成功')
            // this.$router.push('/')
          } else {
            Toast.fail('登录失败')
            this.openLoading = false
          }
          console.log(res);
        })
        .catch(err => {
          Toast.fail('登录失败')
          this.openLoading = false
        })
    },
    checkForm() {
      let isOK = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名长度不能小于5位'
        isOK = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '用户名长度不能小于6位'
        isOK = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOK
    },
    loginAction() {
      this.checkForm() && this.axiosLoginUser()
    }
  },
  created() {
    console.log(localStorage.userInfo);
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
.register-panel {
  width: 90%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
</style>
