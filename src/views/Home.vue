<template>

    <div>
        <Header />
        <Vehicles />
        <Footer />
    </div>

</template>

<script>
    import Header from "@/components/home/Header"
    import Vehicles from "@/views/Vehicles"
    import Footer from "@/components/home/Footer"

    export default {
         components: {
            Header,
            Vehicles,
            Footer
        }
   }

</script>s

<style>

</style>