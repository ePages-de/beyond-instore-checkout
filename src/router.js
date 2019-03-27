import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Cart from '@/components/Cart'
import Install from '@/components/Install'
import Authorize from '@/components/Authorize'
import ProductList from '@/components/ProductList'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/:shop/install',
      name: 'Install',
      component: Install
    }, {
      path: '/:shop/cart',
      name: 'Cart',
      component: Cart
    }, {
      path: '/authorize',
      name: 'Authorize',
      component: Authorize
    }, {
      path: '/products',
      name: 'ProductList',
      props: (route) => ({ page: route.query.page, size: route.query.size }),
      component: ProductList
    }
  ]
})
