<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
                <th scope="col">Userlevel</th>
                <th scope="col">Del</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" v-bind:key="user.id">
                <th scope="row">{{user.id}}</th>
                <td>{{user.firstname}}</td>
                <td>{{user.lastname}}</td>
                <td>{{user.email}}</td>
                <td>{{user.userlevel}}</td>
                <td><v-btn @click="deleteUser(user.id)">X</v-btn></td>
            </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
    import axios from 'axios';

  export default {
      name: 'Users',
      get localUsername() {
        return localStorage.getItem('userid') || -1;
    },        
    data () {
      return  {
        get localUserId() {
            return localStorage.getItem('userid') || 0
        },
        get localUsername() {
            return localStorage.getItem('username') || 0
        },
        get localUserLevel() {
            return localStorage.getItem('userlevel') || 0
        },
        get localUserStatus() {
            return localStorage.getItem('userstatus') || 0
        },
        users: null
      };
    },
    created: function () {
    const userId = localStorage.userid
    var self = this

    axios
      .get('https://ettcars.herokuapp.com/api/users/' + userId)
      .then (res => {
        self.users = res.data        
      })
    },
    methods:{
      deleteUser(id) {
        axios.delete("https://ettcars.herokuapp.com/api/users/" + id)
      }
    }
  }
</script>

<style>
</style>