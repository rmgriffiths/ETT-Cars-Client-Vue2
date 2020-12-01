<template>
  <div class="text-center" >
    <v-dialog v-model="vehicleDialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          Add vehicle
        </v-btn>
      </template>

      <v-card >
        <v-card-title class="headline grey lighten-2">
          Add Vehicle
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-text-field v-model="make" label="Make" required></v-text-field>
                <v-text-field v-model="model" label="Model" required></v-text-field>
                <v-text-field v-model="yearMade" label="Year" required></v-text-field>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="vehicleDialog = false">Cancel</v-btn>
          <v-btn @click="postData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "NewVehiclePost",
        data() {
            return {
              make: null,
              model: null,
              yearMade: null,
              vehicleDialog: false         
            }
        },
        methods:{
            postData() {
                axios.post("https://ettcars.herokuapp.com/api/vehicles", {
                  make: this.make,
                  model: this.model,
                  yearMade: this.yearMade
                }),
              this.vehicleDialog = false;  
            }
        }
    }    

</script>