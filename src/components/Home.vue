<template>

<div class="home">
    <h1>Welcome</h1>
    
</div>

</template>
<script>
    export default {
        methods: {
            goToUsers() {
                this.$router.push('/users');
            },
            goToVehicles() {
                this.$router.push('/vehicles');
            }
        }
    }
</script>
<style>
    h3{
        margin-bottom: 5%;
    }
</style>