<template>
  <v-container mb-12>

    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <h2>My Bookings</h2>
        <div small text>{{noOfBookings}}</div>

        <!-- MY BOOKINGS -->
        <v-row>
          <v-col sm="12" md="12" v-for="item in bookings" :key="item.id">
            <v-card class="mx-auto" outlined>

              <v-carousel :show-arrows="false" hide-delimiter-background class="pa-3" height="300" width="400">
                <v-carousel-item v-for="photo in item.vehicle.photos" :key="photo.id" >
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
                    <div>Booking ID: {{item.id}}</div>
                    <div>Vehicle ID: {{item.vehicleId}}</div>
                    <div>Booking status: {{item.bookingStatus}}</div>
                  </v-list-item-content>

                  <v-list-item-content>
                    <div>Cost: ${{item.bookingCost}}</div>
                    <div>Start date: {{new Date(item.dateOut).toLocaleDateString()}}</div>
                    <div>End date: {{new Date(item.dateIn).toLocaleDateString()}}</div>

                  </v-list-item-content>
  
              </v-list-item>
              <div class="pa-3">
                <v-btn @click="deleteBooking(item)" v-show="localUserLevel == 1">Delete</v-btn>

                <v-btn @click="editBooking(item)" v-show="localUserLevel == 1">Edit</v-btn>
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
    //import moment from 'moment'

    export default {
      data () {
        return  {
          localUserId: this.$cookies.get('userid') || 0,
          localUsername: this.$cookies.get('username') || 0,
          localUserLevel: this.$cookies.get('userlevel') || 0,
          localUserStatus: this.$cookies.get('userstatus') || 0,

          bookings: null,
          noOfBookings: null
        };
      },
      created: function () {
        axios
          .post('https://ettcars.herokuapp.com/api/mybookings', {
            userId: this.$cookies.get('userid')
          })
          .then (res => {
              this.noOfBookings = res.data.length + " bookings found"
              this.bookings = res.data
          })
      },
      methods: {    
        editBooking (itemId) {
          alert ("(Dev) Edit " + itemId)
        },
        deleteBooking (item) {
          if(confirm("Do you really want to delete this booking?")){
            axios
              .delete("https://ettcars.herokuapp.com/api/bookings/" + item.id)
              this.bookings.splice(this.bookings.indexOf(item), 1)
          } 
        } 
      }   
    }
</script>

<style>


</style>