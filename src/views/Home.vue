<template>
    <div>
        <h3>Bienvenido {{user.email}}</h3>
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