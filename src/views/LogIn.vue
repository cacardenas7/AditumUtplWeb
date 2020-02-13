<template>
    <div class="container">
        <div class="text-center">
            <h1>Ingreso de usuarios</h1>
            <form @submit.prevent="loginUsers({email:email,pass:pass})" >
                <input type="email" v-model="email">
                <input type="password" v-model="pass">
                <button type="submit">Acceder</button>
            </form>
            <p>{{error}}</p>
        </div>
        <div>
            
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
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
        ...mapState(['error'])
    },
}
</script>