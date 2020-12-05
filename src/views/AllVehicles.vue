<template>
  <v-container mb-12>
    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <h2>ETT Cars</h2> 
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
                <v-text-field v-model="registration" label="Registration" required></v-text-field>
                <v-text-field v-model="type" label="Type" required></v-text-field>
                <v-text-field v-model="aircon" label="Air con" required></v-text-field>
                <v-text-field v-model="airbags" label="Air bags" required></v-text-field>
                <v-text-field v-model="hourRate" label="Hourly rate" required></v-text-field>
                <v-text-field v-model="dayRate" label="Daily rate" required></v-text-field>
                <v-text-field v-model="weekRate" label="Weekly rate" required></v-text-field>
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

      </v-col>
    </v-row>

    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <v-row>
          <v-col sm="12" md="12" v-for="item in vehicles" :key="item.id">
            <v-card class="mx-auto" outlined>
                            
              <v-list-item three-line>
                <v-list-item-content>
                    <div>Make: {{item.make}}</div>
                    <div>Model: {{item.model}}</div>                    
                    <div>Type: {{item.type}}</div>                    
                    <div>Year: {{item.yearMade}}</div>
                  </v-list-item-content>

                  <v-list-item-content>
                    <div>Hourly: {{item.hourRate}}</div>
                    <div>Daily: {{item.dayRate}}</div>                    
                    <div>Weekly: {{item.weekRate}}</div>
                  </v-list-item-content>
                  
                  <v-list-item-content>
                    <v-carousel :show-arrows="false" hide-delimiter-background height="300">
                      <v-carousel-item v-for="photo in item.photos" :key="photo.id" >
                        <v-sheet height="100%" tile>
                          <v-row align="center" justify="center">
                            <div class="display-3">
                              <v-img v-bind:src="photo.photoUrl" width="400"></v-img>
                            </div>
                          </v-row>
                        </v-sheet>
                      </v-carousel-item>
                    </v-carousel>
                  </v-list-item-content>

              </v-list-item>
              <div class="pa-3">
                <v-btn @click="deleteVehicle(item)">Delete</v-btn>

                <v-btn @click="editVehicle(item)">Edit</v-btn>
                <v-btn @click="photosVehicle(item)">Photos</v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
      data () {
        return  {
          make: null,
          model: null,
          yearMade: null,
          registration: null,
          type: null,
          maxPerson: null,
          colour: null,
          aircon: null,
          airbags: null,
          hourRate: null,
          dayRate: null,
          weekRate: null,
          vehicleDialog: false,

          vehicles: null
        };
      },
      mounted() {
          if (localStorage.username == 0) {
              this.$router.push('/')
          }
      },
      created: function () {
        axios
          .get('https://ettcars.herokuapp.com/api/vehicles')
          .then (res => {
              this.vehicles = res.data
          })
      },
      methods:{
        deleteVehicle(item) {
          if(confirm("Do you really want to delete?")){
            axios
              .delete("https://ettcars.herokuapp.com/api/vehicles/" + item.id)
              this.vehicles.splice(this.vehicles.indexOf(item), 1)
          }
        },
        postData() {
          axios
          .post("https://ettcars.herokuapp.com/api/vehicles", {
            make: this.make,
            model: this.model,
            yearMade: this.yearMade,
            registration: this.registration,
            colour: this.model,
            aircon: this.aircon,
            airbags: this.airbags,
            hourRate: this.hourRate,
            dayRate: this.dayRate,
            weekRate: this.weekRate
          })
          .then (res => {
            this.vehicles.push(res.data)
          })
            this.vehicleDialog = false;  
        } 
      }
    }
</script>

<style>


</style>