<template>
  <v-dialog max-width="600px">
    <v-card class="mx-auto" elevation="2">
      <v-card-title>
        <h2>New Vehicle</h2>
      </v-card-title>
    <v-card-text>

   </v-card-text>
  </v-dialog>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "NewVehiclePosr",
        data() {
            return {
                    make: null,
                    model: null,
                    yearMade: null,
                    owner: null
                
            }
        },
        methods:{
            postData(e) {
                axios.post("https://ettcars.herokuapp.com/api/vehicles", this.posts);
                e.preventDefault();
            }
        }
    }
</script>
<style>
</style>