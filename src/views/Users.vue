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
        data () {
            return  {
                users: null
            };
        },
        created: function () {
    axios
        .get('https://ettcars.herokuapp.com/api/users')
        .then (res => {
            this.users = res.data;
          })
        },
      methods:{
        deleteUser(item) {
          axios.delete("https://ettcars.herokuapp.com/api/users/" + item)
          this.users.splice(this.users.indexOf(item), 1)
        }
      }
    }
</script>
<style>
    h3{
        margin-bottom: 5%;
    }

</style>