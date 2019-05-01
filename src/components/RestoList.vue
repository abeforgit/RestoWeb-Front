<template>
    <div>
        <h1>Studentenrestaurants</h1>
        <h2>Info per locatie</h2>
        <ul>
            <li v-for="resto in restos">
                <router-link to='/'>{{ resto.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    import URL from '../App.vue'

    export default {
        name: 'RestoList',

        data() {
            return {
                restos: null,
            }
        },

        async created() {
            try {
                const response = await axios.get('http://localhost:5000/restos');
                this.restos = response.data.restos
            } catch (e) {
                console.log("Unable to fetch restos")
            }
        },
    }
</script>

<style scoped>

</style>