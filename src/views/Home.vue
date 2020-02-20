<template>
    <div class="container">
        <div class="text-center">
            <br>
        <h3>Bienvenido {{user.email}}</h3>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Home',
    computed: {
        ...mapState(['user'])
    },
}
</script>