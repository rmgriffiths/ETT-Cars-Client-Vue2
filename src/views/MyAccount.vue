<template>
  <v-card class="mx-auto" max-width="90%">
    <v-card-text v-for="user in users" v-bind:key="user.id">
      <h2>My Account</h2><br>
      <p>Firstname: {{user.firstname}}</p>
      <p>Lastname: {{user.lastname}}</p>
      <p>Email: {{user.email}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="editAccount">
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Users',
        
    data () {
      return  {
        localUserId: this.$cookies.get('userid') || 0,
        localUsername: this.$cookies.get('username') || 0,
        localUserLevel: this.$cookies.get('userlevel') || 0,
        localUserStatus: this.$cookies.get('userstatus') || 0,
        users: null
      };
    },
    created: function () {
      const userId = this.localUserId
      var self = this
      
      const AuthStr = 'Bearer '.concat(this.$cookies.get('token'))
      console.log(AuthStr)
      
      axios
        .get('https://ettcars.herokuapp.com/api/users/' + userId, { 
              headers: { Authorization: AuthStr } 
            })
        .then (res => {
          self.users = res.data        
        })
      
    },
    methods:{
      editAccount () {
        alert ("In development")
      },
      deleteUser(id) {
        axios.delete("https://ettcars.herokuapp.com/api/users/" + id)
      }
    }
  }
</script>

<style>
</style>