import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AddToCart from '@/components/AddToCart'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'
import Confirmation from '@/components/Confirmation'
import ProductList from '@/components/ProductList'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, {
      path: '/:shop/cart/:productId',
      name: 'AddToCart',
      props: (route) => ({ productId: route.params.productId }),
      component: AddToCart,
    }, {
      path: '/:shop/cart',
      name: 'Cart',
      component: Cart,
    }, {
      path: '/:shop/checkout',
      name: 'Checkout',
      component: Checkout,
    }, {
      path: '/:shop/confirmation',
      name: 'Confirmation',
      component: Confirmation,
    }, {
      path: '/:shop/products',
      name: 'ProductList',
      component: ProductList,
    }
  ]
})
