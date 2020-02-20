<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Registro de Usuario</h5>
            <form class="form-signin" @submit.prevent="createUser({email,pass:pass1}),signInUser">
              <div class="form-label-group">
                <label for="inputEmail">Correo</label>
                <input type="email" id="inputEmail" class="form-control" required autofocus  v-model="email">
              </div>
              <div class="form-label-group">
                <label for="inputPassword">Clave</label>
                <input type="password" id="inputPassword" class="form-control" required v-model="pass1">

                <label for="inputPassword">Repita clave</label>
                <input type="password" id="inputPassword" class="form-control" required v-model="pass2">
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" :disabled="!desactivar">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
    name:'SignUp',
    data(){
    return{
      email: '',
      pass1: '',
      pass2: ''
    }
  },methods:{
    ...mapActions(['createUser','signInUser'])
  },
  computed: {
    ...mapState(['error']),
    desactivar(){
      return this.pass1 === this.pass2 && this.pass1 !=''
    }
  },
}
</script>

<style lang="stylus">
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
</style>