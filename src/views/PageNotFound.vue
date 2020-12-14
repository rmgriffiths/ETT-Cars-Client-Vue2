<template>


  <v-card class="mx-auto" max-width="90%">
    <v-card-text>
      <h2>Page not found</h2><br>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="home">
        Back
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
 
<script>
    export default {
        methods: {
            home () {
                this.$router.push('/') 
            }
        }
    }

</script>
 
<style>
 
</style>