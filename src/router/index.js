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
      component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
      meta: {requiresAuth: true}

    },
    {
      path: '/',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue')
    },
    {
      path: '/carrera',
      name: 'carrera',
      component: () => import(/* webpackChunkName: "about" */ '../views/Career.vue'),
      meta: {requiresAuth: true}

    },
    {
      path: '/area',
      name: 'area',
      component: () => import(/* webpackChunkName: "about" */ '../views/KnowledgeArea.vue'),
      meta: {requiresAuth: true}

    },
    {
      path: '/bloques',
      name: 'bloques',
      component: () => import(/* webpackChunkName: "about" */ '../views/Blocks.vue'),
      meta: {requiresAuth: true}

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
