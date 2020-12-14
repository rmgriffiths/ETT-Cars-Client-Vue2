<template>
  <v-container mb-12>
    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <h2>My Bookings</h2>
        <div small text>{{noOfBookings}}</div>

        <v-row>
          <v-col sm="12" md="12" v-for="item in bookings" :key="item.id">
            <v-card class="mx-auto" outlined>
                            
              <v-list-item three-line>
                <v-list-item-content>
                    <div>Booking ID:<br>{{item.id}}</div>

                  </v-list-item-content>

                  <v-list-item-content>
                    <div>Vehicle ID: {{item.vehicleId}}</div>
                    <div>Cost: {{item.bookingCost}}</div>
                    <div>Start date: {{item.dateOut}}</div>
                    <div>End date:{{item.dateIn}}</div>
                    <div>Booking status:{{item.bookingStatus}}</div>

                  </v-list-item-content>
  
              </v-list-item>
              <div class="pa-3">
                <v-btn @click="deleteBooking(item.id)" v-show="localUserLevel == 1">Delete</v-btn>

                <v-btn @click="editBooking(item.id)" v-show="localUserLevel == 1">Edit</v-btn>
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
        deleteBooking (itemId) {
          alert ("(Dev) Delete " + itemId)
        },

      }    
    }
</script>

<style>


</style>