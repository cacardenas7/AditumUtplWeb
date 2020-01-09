<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name:'registro'}">Registro</router-link>
      <router-link :to="{name:'inicio'}">Inicio</router-link>
      <router-link :to="{name:'ingreso'}">Ingreso</router-link>
      <a @click="logoutUsers">Cerrar Sesion</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['logoutUsers'])
  },
}
</script>
