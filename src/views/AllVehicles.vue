<template>
  <v-container mb-12>

    <v-row>
      <v-col>
        
        <h2>ETT Cars</h2>
        <div small text>{{noOfCars}}</div>                
 
        <!-- SEARCH CARD -->
        <v-dialog v-model="searchDialog" width="600">
          <template v-slot:activator="{ on, attrs }" >
            <v-btn id="searchButton" v-bind="attrs" v-on="on" light >
              Search
            </v-btn>
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
                    <v-text-field v-model="dateRangeText" readonly></v-text-field>
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
      </v-col>
    </v-row>


    <v-row>
      <v-col v-for="item in vehicles" :key="item.id">
        <v-card class="mx-auto" outlined>

          <v-carousel :show-arrows="false" hide-delimiter-background class="pa-3" height="300" width="400">
            <v-carousel-item v-for="photo in item.photos" :key="photo.id" >
              <v-sheet height="100%" tile light>
                <v-row align="center" justify="center">
                  <div class="display-2">
                    <v-img v-bind:src="photo.photoUrl" height="300" width="400"></v-img>
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>              
                        
          <v-list-item three-line>
            <v-list-item-content>
              <div v-show="localUserLevel == 2"> {{item.id}} </div>                    
              <div><h2><b>{{item.make}}<br>{{item.model}}</b></h2></div>                    
              <div>{{item.type}}</div>                    
              <div>{{item.yearMade}}</div>
              <div>{{item.colour}}</div>
              
              <div>Hourly rate: {{item.hourRate}}</div>
              <div>Daily rate: {{item.dayRate}}</div>                    
              <div>Weekly rate: {{item.weekRate}}</div>

            </v-list-item-content>
          </v-list-item>

          <v-btn id="bookButton" @click="openBooking(item.id)" class="pa-3">
            Book
          </v-btn>

        </v-card>
      </v-col>
    </v-row>

    <!--Booking Dialog -->
    <v-dialog v-model="bookingDialog" width="600">
      <v-card >
        <v-card-title class="headline grey lighten-2">
          Booking
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation>
            <v-row>


              <v-col cols="12" sm="6">

                <v-text-field v-model="bookVehicleId"></v-text-field>

              </v-col>

              <v-col cols="12" sm="6">

                <v-text-field v-model="dateRangeBookText" readonly></v-text-field>
                <v-text-field v-model="dateRangeText"></v-text-field>

              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="bookingDialog = false">Cancel</v-btn>
          <v-btn @click="confirmBooking">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
      data () {
        return  {
          localUserId: this.$cookies.get('userid') || 0,
          localUsername: this.$cookies.get('username') || 0,
          localUserLevel: this.$cookies.get('userlevel') || 0,
          localUserStatus: this.$cookies.get('userstatus') || 0, 
                   
          dates: [],
          searchDialog: false,
          bookingDialog: false,

          bookVehicleId: null,
          dateRangeBookText: null,

          vehicleMake: null,
          vehicleModel: null,
          vehicleColour: null,

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

          noOfCars: null,

          vehicles: null
        };
      },
      mounted() {
          if (localStorage.username == 0) {
              //this.$router.push('/')
          }
      },
      computed: {
        dateRangeText () {
          return this.dates.join(' ~ ')
        },
      },
      created: function () {
        axios
          .get('https://ettcars.herokuapp.com/api/vehicles')
          .then (res => {
              this.noOfCars = res.data.length + " vehicles found"
              this.vehicles = res.data
          })
      },
      methods:{
        openBooking (vehicle) {
          this.bookingDialog = true
          this.bookVehicleId = vehicle   
        },
        confirmBooking() {
          axios
            .post('https://ettcars.herokuapp.com/api/bookings', {
                vehicleId: this.bookVehicleId,
                userId: this.localUserId
                //dateIn: this.dates,
                //dateOut: this.dates
            })
         
            this.bookingDialog = false

            alert ("Booking made")
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
        },
        searchDialogFind() {   
          
          var self = this

          axios
            .post('https://ettcars.herokuapp.com/api/vehiclesearch', {
                make: self.vehicleMake,
                model: self.vehicleModel,
                colour: self.vehicleColour
            })
            .then (res => {
                this.noOfCars=res.data.length + " vehicles found"
                this.vehicles = res.data;
            })
          
          this.searchDialog = false
        }
      }            
    }
</script>

<style>


</style>