import Vue from 'vue'
import VueRouter from 'vue-router'
var firebase = require ("firebase/app")

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
    },
    {
      path: '/',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
      meta: {requiresAuth: true}
    },
    ,
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
    } 
  ]
})

router.beforeEach((to,from,next)=>{
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth)
  const user = firebase.auth().currentUser;
  if(protectedRoute === true && user === null){
    next({name:'ingreso'})
  }else{
    next()
  }
})

export default router
