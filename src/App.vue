<template>
  <div id="app">
    <b-navbar toggleable="md" v-if="existingUser" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{name:'registro'}" >Usuarios</b-nav-item>
        <b-nav-item :to="{name:'carrera'}" >Carreras</b-nav-item>
        <b-nav-item :to="{name:'area'}" >Areas de conocimiento</b-nav-item>
        <b-nav-item :to="{name:'bloques'}" >Bloques</b-nav-item>
        <b-nav-item :to="{name:'inicio'}" exact>Inicio</b-nav-item>
        <b-nav-item @click="logoutUsers" >Cerrar Sesion</b-nav-item>
      </b-navbar-nav>  
    </b-navbar>    
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['logoutUsers'])
  },
  computed: {
    ...mapGetters(['existingUser'])
  },
}
</script>
