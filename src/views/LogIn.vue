<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Iniciar sesión</h5>
              <form class="form-signin" @submit.prevent="loginUsers({email:email,pass:pass})">
                <div class="form-label-group">
                  <label for="inputEmail">Correo</label>
                  <input type="email" id="inputEmail" class="form-control" required autofocus  v-model="email">
                </div>
                <div class="form-label-group">
                  <label for="inputPassword">Clave</label>
                  <input type="password" id="inputPassword" class="form-control" required v-model="pass">
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="load">
        <h3>Cargando contenido...</h3>
        <pulse-loader :loading="load" ></pulse-loader>
      </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
    name: 'LogIn',
    data(){
        return{
            email:'',
            pass:''
        }
    },
    methods:{
        ...mapActions(['loginUsers'])
    },
    computed: {
        ...mapState(['error','load'])
    },
    components: {
        PulseLoader
    }
}
</script>

<style lang="stylus">

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}


</style>