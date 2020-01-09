import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var firebase = require ("firebase/app")
require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

var firebaseConfig = {
  apiKey: "AIzaSyDrASIttUSz3mSBjPmfBDouiInq6TQ13SU",
  authDomain: "admisionutpl-a48ad.firebaseapp.com",
  databaseURL: "https://admisionutpl-a48ad.firebaseio.com",
  projectId: "admisionutpl-a48ad",
  storageBucket: "admisionutpl-a48ad.appspot.com",
  messagingSenderId: "370079460295",
  appId: "1:370079460295:web:7b083766fdd45290bd87e2",
  measurementId: "G-X6P7BXFM8X"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  if(user){
    store.dispatch('detectUser',{email: user.email, uid: user.uid})
  }else{
    store.dispatch('detectUser',null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
