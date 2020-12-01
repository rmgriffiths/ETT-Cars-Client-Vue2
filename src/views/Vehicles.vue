<template>
<div>
  <NewVehicleModal />

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Make</th>
          <th class="text-left">Model</th>
          <th class="text-left">Year</th>
          <th class="text-left">Reg</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in vehicles"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.make }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.yearMade }}</td>
          <td>{{ item.registration }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</template>

<script>
    import axios from 'axios';
    import NewVehicleModal from "./NewVehicleModal"

    export default {
  components: { NewVehicleModal },
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
        },
        methods: {
            newVehicle() {
                this.$router.push('/newvehicle');
            }
        }
    }
</script>
<style>


</style>