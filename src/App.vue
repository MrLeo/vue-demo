<style></style>
<template>
    <div>
        <router-view keep-alive></router-view>
    </div>
</template>
<script>
    import store from './vuex/store'
    export default {
        name: "App",
        store,
        data(){
            return {}
        },
        components: {}
    }
</script>


