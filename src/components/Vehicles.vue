<template>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Make
          </th>
          <th class="text-left">
            Model
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in vehicles"
          :key="item.id"
        >
          <td>{{ item.make }}</td>
          <td>{{ item.model }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
     import axios from 'axios';

    export default {
        name: 'Vehicles',
        data () {
            return  {
                vehicles: null
            };
        },
        created: function () {
            axios
                .get('https://ettcars.herokuapp.com/api/vehicles')
                .then (res => {
                    this.vehicles = res.data;
                    console.log(this.vehicles);
                })
        }
    }
</script>
<style>


</style>