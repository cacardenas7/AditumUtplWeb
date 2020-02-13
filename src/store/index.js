import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
var firebase = require ("firebase/app")
import db from '../main'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:'',
    error:'',
    careers: [],
    career:{Nombre: "", AreaConocimiento:{}},
    arrayAreas: [],
    knowledgeArea:{Nombre:""}
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    setError(state,payload){
      state.error = payload
    },
    setCareers(state,payload){
      state.careers = payload
    },
    setCareer(state,payload){
      state.career = payload
    },
    setKnowledgeAreas(state,payload){
      state.arrayAreas = payload;
    },
    setKnowledgeArea(state,payload){
      state.knowledgeArea = payload;
    }
  },
  actions: {

    //Users
    createUser({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.pass).then(res=>{

      })
      .catch(err=>{
        commit('setError', err.message)
      })

    },
    loginUsers({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass).then(res=>{
        commit('setUser',{email:res.user.email,uid:res.user.uid})
        router.push({name: 'inicio'})
      })
      .catch(err=>{
        commit('setError', err.message)
      })
    },
    detectUser({commit},payload){
      if(payload != null){
        commit('setUser',{email:payload.email, uid:payload.uid})
      }else{
        commit('setUser',null)
      }
    },
    logoutUsers({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
      router.push({name: 'ingreso'})
    },

    //Career Query
    
    getCareers({commit}){
      const careers =[]
      db.collection('Carreras').get().then(snapshot => {
        snapshot.forEach(doc => {
          let career = doc.data();
          career.id = doc.id
          careers.push(career)
        });
      })

      commit('setCareers', careers)
    },
    getCareer({commit}, id){
      db.collection('Carreras').doc(id).get()
      .then(doc => {
        let career = doc.data();
        career.id = doc.id
        commit('setCareer', career)
      })
    },
    addCareer({commit}, payload){
      db.collection('Carreras').add({
        Nombre: payload.name,
        AreaConocimiento: payload.careersChecked
      })
      .then(doc => {
        router.push({name: 'carrera'})
      })
    },
    deleteCareer({commit, dispatch}, id){
      db.collection('Carreras').doc(id).delete()
      .then(()=>{
        dispatch('getCareers')
      })
    },
    updateCareer({commit, dispatch}, career){
      db.collection('Carreras').doc(career.id).update({
        Nombre: career.Nombre,
        AreaConocimiento: career.AreaConocimiento

      })
      .then(()=>{
        dispatch('getCareers')
      })
    },
  
    //KnowledgeAreas Query
    getKnowledgeAreas({commit}){
      const arrayAreas =[]
      db.collection('AreaConocimiento').get().then(snapshot => {
        snapshot.forEach(doc => {
          let area = doc.data();
          area.id = doc.id
          arrayAreas.push(area)
        });
      })
      commit('setKnowledgeAreas', arrayAreas)
    },
    getKnowledgeArea({commit}, id){
      db.collection('AreaConocimiento').doc(id).get()
      .then(doc => {
        let KnowledgeArea = doc.data();
        KnowledgeArea.id = doc.id
        commit('setKnowledgeArea', KnowledgeArea)
      })
    },
    addKnowledgeArea({commit}, payload){
      db.collection('AreaConocimiento').add({
        Nombre: payload.name
      })
      .then(doc => {
        router.push({name: 'area'})
      })
    },
    deleteKnowledgeArea({commit, dispatch}, id){
      db.collection('AreaConocimiento').doc(id).delete()
      .then(()=>{
        dispatch('getKnowledgeAreas')
      })
    },
    updateKnowledgeArea({commit}, knowledgeArea){
      db.collection('AreaConocimiento').doc(knowledgeArea.id).update({
        Nombre: knowledgeArea.Nombre

      })
    },


  },
  getters: {
    existingUser(state){
      if(state.user === null || state.user === '' || state.user === undefined){
        return false;
      }else{
        return true;
      }
    }
  }
})
