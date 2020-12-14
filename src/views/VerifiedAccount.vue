<template>


  <v-card class="mx-auto" max-width="90%">
    <v-card-text v-for="user in users" v-bind:key="user.id">
      <h2>Account Verified</h2><br>
      <p>Explore cars</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="home">
        Let's go
      </v-btn>
    </v-card-actions>
  </v-card>

</template>
 
<script>
    import axios from 'axios';
    
    export default {

        created: function () {
            const userId = this.localUserId
            var self = this

            axios
            .get('https://ettcars.herokuapp.com/api/users/' + userId)
            .then (res => {
                self.users = res.data        
            })
        },
        methods: {
            home () {
                this.$router.push('/') 
            }
        }
    }

</script>
 
<style>
 
</style>