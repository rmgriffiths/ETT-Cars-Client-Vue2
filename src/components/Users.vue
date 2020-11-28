<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" v-bind:key="user.id">
                <th scope="row">{{user.id}}</th>
                <td>{{user.firstname}}</td>
                <td>{{user.lastname}}</td>
                <td>{{user.email}}</td>
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
                    console.log(this.users);
                })
        }
    }
</script>
<style>
    h3{
        margin-bottom: 5%;
    }

</style>