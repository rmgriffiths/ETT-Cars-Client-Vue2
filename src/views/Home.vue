<template>

    <div>
        <Header />
        <AllVehicles />
        <Footer />
    </div>

</template>

<script>
    import Header from "@/components/home/Header"
    import AllVehicles from "@/views/AllVehicles"
    import Footer from "@/components/home/Footer"

    export default {
         components: {
            Header,
            AllVehicles,
            Footer
        }
   }

</script>

<style>

</style>