<template>

  <v-container mb-12>

    <v-row>
      <v-col>
        <!--No of cars hidden--> 
        <v-text-field v-model="noOfCars" readonly small text v-show="noOfCars < 0">{{noOfCars + ' vehicles Found'}}</v-text-field>
        <v-text-field v-model="dateRangeText" readonly></v-text-field>

        <!-- SEARCH CARD -->
        <v-dialog v-model="searchDialog" width="600">
          <template v-slot:activator="{ on, attrs }" >
            <v-btn id="searchButton" v-bind="attrs" v-on="on" light >
              Search
            </v-btn>
          </template>

          <v-card >
            <v-card-title class="headline grey lighten-2">
              Find your vehicle
            </v-card-title>

            <v-card-text>
              <v-form lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-menu
                      ref="menuStart"
                      v-model="menuStart"
                      :close-on-content-click="true"
                      :return-value.sync="dateStart"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateStart"
                          label="Start Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateStart"
                        no-title
                        scrollable
                        @change="saveDateStart"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuStart = false"
                        >
                          Cancel
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-text-field v-model="vehicleMake" label="Make" required></v-text-field>
                    <v-text-field v-model="vehicleModel" label="Model"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-menu ref="menuEnd" 
                      v-model="menuEnd"
                      :close-on-content-click="true" 
                      :return-value.sync="dateEnd"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateEnd"
                          label="End Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          required
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateEnd"
                        no-title
                        scrollable
                        @change="saveDateEnd"
                     >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menuEnd = false"
                        >
                          Cancel
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
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

    <!-- VEHICLE CARD -->
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
              <div v-show="localUserLevel == 1"> {{item.id}} </div>                    
              <div><h2><b>{{item.make}} {{item.model}}</b></h2></div>                    
              <div>{{item.type}}</div>                    
              <div>Year: {{item.yearMade}} {{item.colour}}</div>
              
              <div v-show="localSearch == 0">
                <div>Day rate: ${{item.dayRate}} Week rate: ${{item.weekRate}}</div>
              </div>

              <div v-show="localSearchRate == 1">
                <div>Cost: ${{item.dayRate * localBookingDays}}</div>                    
              </div>

              <div v-show="localSearchRate == 2">
                <div>Cost: ${{item.weekRate * localBookingDays}}</div>                    
              </div>              
                
            </v-list-item-content>

            <v-btn id="bookButton" 
              @click="openBooking(item.id, item.dayRate, item.weekRate)" 
              class="pa-3"
              v-show="localBookingStatus == 1 && localUserStatus ==1"
            >
              Book
            </v-btn>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>

    <!--BOOKING DIALOG -->
    <v-dialog v-model="bookingDialog" width="600">
      <v-card >
        <v-card-title class="headline grey lighten-2">
          Booking Confirmation
        </v-card-title>

        <v-card-text>
          <v-form lazy-validation>
            <v-row>

              <v-col cols="12" sm="6">
                Agree to booking of vehicle:
                <v-text-field v-model="bookingVehicleId"></v-text-field>
                Dates: 
                <v-text-field v-model="dateRangeText" readonly></v-text-field>
                No of days: 
                <v-text-field v-model="dateRangeDays" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                The cost of:
                <v-text-field v-model="bookingCost" readonly></v-text-field>
                by
                <v-text-field v-model="bookingUserId" readonly></v-text-field>
                <v-text-field v-model="bookingUsername" readonly></v-text-field>

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
    import { EventBus } from '../components/event-bus'

    export default {
      data () {
        return  {
          localUserId: this.$cookies.get('userid') || 0,
          localUsername: this.$cookies.get('username') || 0,
          localUserLevel: this.$cookies.get('userlevel') || 0, // 1-standard, 2-admin
          localUserStatus: this.$cookies.get('userstatus') || 0, 
          localBookingStatus: 0,
          localBookingDays: 0,
          localSearch:0,
          localSearchRate:0,

          //Booking dialog
          bookingDialog: false,
          bookingUsername: null,
          bookingUserId: null,
          bookingCost: null,
          bookingVehicleId: null,

          //Search dialog
          searchDialog: false,
          vehicleMake: null,
          vehicleModel: null,
          vehicleColour: null,          
          dateStart: null,
          dateEnd: null,
          menuStart: false,
          menuEnd: false,

          dateRangeText: null,
          dateRangeDays: null,
          noOfCars: null,
          vehicles: null,
        };
      },
      mounted() {
          if (localStorage.username == 0) {
              //this.$router.push('/')
          }
      },
      created() {
        EventBus.$on('loggedIn', loggedIn => {
          this.localUserStatus = loggedIn
          console.log("Am I logged in? " + this.localUserStatus)
        }),
        axios
          .get('https://ettcars.herokuapp.com/api/vehicles')
          .then (res => {
              this.noOfCars = res.data.length
              this.vehicles = res.data
          })
      },
      methods:{
        openBooking (vehicle, dayRate, weekRate)  {
          this.bookingDialog = true

          if ( this.localBookingDays < 7) {
            this.bookingCost = this.localBookingDays * dayRate //MESSY
            this.dateRangeDays = this.localBookingDays + " days at $" + dayRate
          }
          else {
            this.dateRangeDays = this.localBookingDays + " days at $" + weekRate
            this.bookingCost = this.localBookingDays * weekRate //MESSY
          }
          
          this.bookingVehicleId = vehicle   
          this.bookingUserId = "UserId: " + this.localUserId   
          this.bookingUsername = "Username: " + this.localUsername   
        },
        confirmBooking() {
          var self = this
          console.log(self.bookingVehicleId)
          console.log(self.localUserId)

          axios
            .post('https://ettcars.herokuapp.com/api/bookings', {
                vehicleId: self.bookingVehicleId,
                userId: self.localUserId,
                dateOut: self.dateStart,
                dateIn: self.dateEnd,
                bookingCost: self.bookingCost,
                bookingStatus: 0
            })
            this.bookingDialog = false
            alert ("Booking made")
        },
        saveDateStart (dateStart) {
          this.$refs.menuStart.save(dateStart)
          if (dateStart > this.dateEnd) {
            this.dateEnd = dateStart
            this.$refs.menuEnd.save(dateStart)
          }
        },
        saveDateEnd (dateEnd) {
          this.$refs.menuEnd.save(dateEnd)
          if (this.dateEnd < this.dateStart) {
            this.dateStart = dateEnd
            this.$refs.menuStart.save(dateEnd)
          }
        },
        searchDialogFind() {   
          const startDate = new Date(this.dateStart)
          const endDate = new Date(this.dateEnd)
          if (startDate.valueOf() > 0 && endDate.valueOf() > 0) {
            this.localBookingDays = Math.round(Math.abs((startDate - endDate) / 86400000)) + 1
              
              this.localSearch = 1

              this.dateRangeText = this.dateStart + " - " + this.dateEnd

              if ( this.localBookingDays < 7) {
                this.localSearchRate = 1
              }
              else {
                this.localSearchRate = 2
              }

              var self = this
              axios
                .post('https://ettcars.herokuapp.com/api/vehiclesearch', {
                    make: self.vehicleMake,
                    model: self.vehicleModel,
                    colour: self.vehicleColour
                })
                .then (res => {
                    this.noOfCars=res.data.length
                    this.vehicles = res.data
                    this.localBookingStatus = 1
              })
            
            this.searchDialog = false
          }
        }
      }            
    }
</script>

<style>


</style>