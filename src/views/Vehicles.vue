<template>

  <v-container mb-12>

    <!-- SEARCH CARD -->
    <v-dialog v-model="searchDialog" width="600">
      <template v-slot:activator="{ on, attrs }" >
        <v-btn id="searchButton" v-bind="attrs" v-on="on" light >
          Search
        </v-btn>

        <div small text>{{noOfCars}}</div>

      </template>

      <v-card >
        <v-card-title class="headline grey lighten-2">
          Find your car
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker v-model="dates" range></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly hidden>

                </v-text-field>
                <div hidden>
                  model: {{ dates }}
                </div>

                <v-text-field v-model="vehicleMake" label="Make" required></v-text-field>
                <v-text-field v-model="vehicleModel" label="Model"></v-text-field>
                <v-text-field v-model="vehicleColour" label="Colour" required></v-text-field>

              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="searchDialog = false">Cancel</v-btn>
          <v-btn @click="searchDialogFind">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- LIST OF CARS -->
    <v-row>
      <v-col cols="12">
          <v-row>
            <v-col cols="12" v-for="item in vehicles" :key="item.id">
              <v-card class="mx-auto" outlined>
                
                <v-list-item>
                  <v-list-item-content three-lines>
                    <div>
                      {{item.make}}
                    </div>
                    <div>
                      {{item.model}}
                    </div>                    
                    <div>
                      {{item.yearMade}}
                    </div>
                  </v-list-item-content>

                  <v-list-item-content>
                    <div>
                      Hour: {{item.hourRate}}
                    </div>
                    <div>
                      Day: {{item.dayRate}}
                    </div>                    
                    <div>
                      Week: {{item.weekRate}}
                    </div>
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
          dates: [],
          model: 0,
          searchDialog: false,

          vehicleMake: null,
          vehicleModel: null,
          vehicleColour: null,
          
          noOfCars: 0,

          vehicles: null
        };
      },
      computed: {
        dateRangeText () {
          return this.dates.join(' ~ ')
        }
      },
      created: function () {
        axios
          .get('https://ettcars.herokuapp.com/api/vehicles')
          .then (res => {

              console.log(res.data.length)
              this.noOfCars = res.data.length + " vehicles found"

              this.vehicles = res.data;
              console.log('Vehicle data:')
              console.log(res.data[0])
          })
      },
      methods:{
        searchDialogFind() {   

          const colour = this.vehicleColour 
          
          axios
            .post('https://ettcars.herokuapp.com/api/vehiclesearch'), {
                    colour: colour
                  }
            .then (res => {

                console.log(res.data.lenght)
                this.noOfCars=res.data.length + " vehicles found"

                this.vehicles = res.data;
                console.log('Vehicle data:')
                console.log(res.data[0])
            })
          
          self.searchDialog = false

        }
      }           
    }
</script>
<style>
 

</style>