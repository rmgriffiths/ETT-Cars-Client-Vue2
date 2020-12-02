<template>
  <div class="text-center" >
    <v-dialog v-model="userDialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          Add vehicle
        </v-btn>
      </template>

      <v-card >
        <v-card-title class="headline grey lighten-2">
          Login
        </v-card-title>

        <v-card-text>
            <v-form>
                <v-text-field v-model="uname" label="User" required></v-text-field>
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field v-model="pword1" label="Password" required></v-text-field>
                <v-text-field v-model="pword2" label="Confirm" required></v-text-field>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="userDialog = false">Cancel</v-btn>
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
              uname: null,
              email: null,
              pword: null,
              userDialog: false         
            }
        },
        methods:{
            postData() {
                axios.post("https://ettcars.herokuapp.com/api/users", {
                  uname: this.uname,
                  email: this.email,
                  pword: this.pword
                }),
              this.userDialog = false;  
            }
        }
    }    

</script>