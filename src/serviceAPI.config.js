const BASEURL = "https://www.easy-mock.com/mock/5b42b958fe23070c51e5235c/example"
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register',
  loginUser: LOCALURL + 'user/login'
}

module.exports = URL
// export default URL
