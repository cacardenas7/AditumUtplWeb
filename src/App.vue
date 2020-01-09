<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name:'registro'}" v-if="!existingUser">Registro</router-link>
      <router-link :to="{name:'inicio'}" v-if="existingUser">Inicio</router-link>
      <router-link :to="{name:'ingreso'}" v-if="!existingUser">Ingreso</router-link>
    {{existingUser}}
      <a @click="logoutUsers" v-if="existingUser">Cerrar Sesion</a>
      <a @click="logoutUsers" v-if="existingUser">Cerrar Sesion</a>
      <a @click="logoutUsers" v-if="existingUser">Cerrar Sesion</a>
    </div>
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
