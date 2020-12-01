<template>
  <v-container mb-12>
    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <h2>ETT Cars</h2> 
        <NewVehicle />
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
          <v-row>
            <v-col sm="12" md="12" v-for="item in vehicles" :key="item.id">
              <v-card outlined>
                <v-img src="../assets/LandCruiser.jpg" height="200px"></v-img>
                <v-card-title>{{item.make}} {{item.model}}</v-card-title>
                <v-card-actions>
                  <v-btn @click="deleteVehicle(item.id)">Delete</v-btn>

                </v-card-actions>            
              </v-card>
            </v-col>

          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import axios from 'axios';
    import NewVehicle from "./NewVehicle"

    export default {
    components: { 
      NewVehicle
      },
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
          })
      },
      methods:{
        deleteVehicle(id) {
          axios.delete("https://ettcars.herokuapp.com/api/vehicles/" + id)
        }
      }
    }
</script>
<style>


</style>