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
    knowledgeArea:{Nombre:""},
    arrayBlocks: [],
    block:{NombreBloque:""},
    arrayBank: [],
    bank:{Dificultad: "", Pregunta: "", PreguntaImagen: "", Rta1: "", Rta2: "", Rta3: "", RtaCorrecta: ""},
    sIdBlock:"",
    load: false
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
    },
    setBlocks(state,payload){
      state.arrayBlocks = payload;
    },
    setBlock(state,payload){
      state.block = payload;
    },
    setBanks(state,payload){
      state.arrayBank = payload;
    },
    setBank(state,payload){
      state.bank = payload;
    },
    setidBlock(state,payload){
      state.sIdBlock = payload;
    },

    //Load animation
    loadFirebase(state,payload){
      state.load = payload
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

    //Careers Query
    getCareers({commit}){
      commit('loadFirebase',true);
      const careers =[]
      db.collection('Carreras').get().then(snapshot => {
        snapshot.forEach(doc => {
          let career = doc.data();
          career.id = doc.id
          careers.push(career)
        });
      commit('loadFirebase',false);
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
    updateKnowledgeArea({commit}, payload){
      db.collection('AreaConocimiento').doc(payload.id).update({
        Nombre: payload.Nombre

      })
    },

    //Blocks Query
    getBlocks({commit},id){
      const arrayBlocks =[]
      db.collection('AreaConocimiento').doc(id).collection('Bloques').get().then(snapshot => {
        snapshot.forEach(doc => {
          let blocks = doc.data();
          blocks.id = doc.id
          arrayBlocks.push(blocks)
        });
      })
      commit('setBlocks', arrayBlocks)
    },
    getBlock({commit},payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).get().then(doc=>{
        let block = doc.data();
        block.id = doc.id
        block.idArea = payload.idArea
        block.idBlock = payload.idBlock
        commit('setBlock', block)
      })
    },
    addBlocks({commit}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').add({
        NombreBloque: payload.NombreBloque
      })
      .then(doc => {
        router.push({name: 'bloques'})
      })
    },
    deleteBlocks({commit, dispatch}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).delete()
    },
    updateBlock({commit}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).update({
        NombreBloque: payload.NombreBloque
      })
    },

    //Bank Query
    saveIdBlock({commit},id){
      commit('setidBlock', id)
    },
    getBanks({commit},payload){
      const arrayBank =[]
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).collection('BancoPreguntas').get().then(snapshot => {
        snapshot.forEach(doc => {
          let bank = doc.data();
          bank.id = doc.id
          arrayBank.push(bank)
        });
      })
      commit('setBanks', arrayBank)
    },
    getBank({commit},payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).collection('BancoPreguntas').doc(payload.idBank).get().then(doc=>{
        let bank = doc.data();
        bank.id = doc.id
        bank.idArea = payload.idArea
        bank.idBlock = payload.idBlock
        bank.idBank = payload.idBank
        commit('setBank', bank)
      })
    },
    addBanks({commit}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).collection('BancoPreguntas').add({
        Dificultad: payload.Dificultad,
        Pregunta: payload.Pregunta,
        PreguntaImagen: payload.PreguntaImagen,
        Rta1: payload.Rta1,
        Rta2: payload.Rta2,
        Rta3: payload.Rta3,
        RtaCorrecta: payload.RtaCorrecta
      })
      .then(doc => {
        router.push({name: 'bloques'})
      })
    },
    deleteBanks({commit, dispatch}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).collection('BancoPreguntas').doc(payload.idBank).delete()
    },
    updateBank({commit}, payload){
      db.collection('AreaConocimiento').doc(payload.idArea).collection('Bloques').doc(payload.idBlock).collection('BancoPreguntas').doc(payload.idBank).update({
        Dificultad: payload.Dificultad,
        Pregunta: payload.Pregunta,
        PreguntaImagen: payload.PreguntaImagen,
        Rta1: payload.Rta1,
        Rta2: payload.Rta2,
        Rta3: payload.Rta3,
        RtaCorrecta: payload.RtaCorrecta
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
