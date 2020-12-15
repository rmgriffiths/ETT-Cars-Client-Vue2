<template>
  <v-container mb-12>

    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
        <h2>My Vehicles</h2>
        <div small text>{{noOfCars}}</div>

        <!-- ADD VEHICLE  CARD -->
        <v-dialog v-model="vehicleDialog" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-show="localUserLevel == 1" >
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
                <v-text-field v-model="colour" label="Colour" required></v-text-field>
                <v-text-field v-model="maxPerson" label="Max passengers" required></v-text-field>
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
              <v-btn @click="postData" v-show="editMode='new'">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- MY VEHICLES -->
        <v-row>
          <v-col sm="12" md="12" v-for="item in vehicles" :key="item.id">
            <v-card class="mx-auto" outlined >
              
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
              
              <div class="pa-3">
                  <input 
                      type="file"
                      @change="uploadImage"
                      accept="image/*"
                      :ref="`imageInput_${item.id}`"
                      class="d-none"
                  >
                  <v-btn @click="buttonClicked(item.id)">Upload photo</v-btn>
              </div>

              <v-list-item three-line>
                <v-list-item-content>
                    <div>Id: {{item.id}}</div>
                    <div>Make: {{item.make}}</div>
                    <div>Model: {{item.model}}</div>                    
                    <div>Type: {{item.type}}</div>                    
                    <div>Year: {{item.yearMade}}</div>
                  </v-list-item-content>

                  <v-list-item-content>
                    <div>Colour: {{item.colour}}</div>
                    <div>Hourly rate: {{item.hourRate}}</div>
                    <div>Daily rate: {{item.dayRate}}</div>                    
                    <div>Weekly rate: {{item.weekRate}}</div>
                    <div>{{item.photos.length}} Photos</div>
                  </v-list-item-content>

              </v-list-item>

              <div class="pa-3">
                <v-btn @click="deleteVehicle(item)" v-show="localUserLevel == 1">Delete</v-btn>
                <v-btn @click="editVehicle(item)" v-show="localUserLevel == 1">Edit</v-btn>
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
  import firebase from 'firebase';
    
  export default {
    name: 'Upload',
    data () {
      return  {
        localUserId: this.$cookies.get('userid') || 0,
        localUsername: this.$cookies.get('username') || 0,
        localUserLevel: this.$cookies.get('userlevel') || 0,
        localUserStatus: this.$cookies.get('userstatus') || 0,          
       
        vehicleMake: null,
        vehicleModel: null,
        vehicleColour: null,

        editMode: null,
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

        imageData: null,
        imageUploadVehicleId: null,
        imageUploadUrl: null,

        imageDialog: false,
        noOfCars: null,

        vehicles: null
      };
    },
    created: function () {
      axios
        .post('https://ettcars.herokuapp.com/api/myvehicles', {
          ownerId: this.$cookies.get('userid')
        })
        .then (res => {
            this.noOfCars = res.data.length + " vehicles found"
            this.vehicles = res.data
        })
    },
    methods:{
        buttonClicked(itemId) {
          let ref = `imageInput_${itemId}`
          let element = this.$refs[ref]
          this.imageUploadVehicleId = itemId
          element[0].click()
        },
        uploadImage(event){
          this.imageData = event.target.files[0];
          firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(downloadURL => {
                this.imageUploadUrl = `Download link - ${downloadURL}`
                axios
                  .post("https://ettcars.herokuapp.com/api/photos", {
                    vehicleId: this.imageUploadVehicleId,
                    photoUrl: downloadURL
                  })
                  .then (res => {
                    const index = this.vehicles.findIndex(v => v.id === this.imageUploadVehicleId)
                    if (index !== -1) {
                    this.vehicles[index].photos.push({id: res.data.id, photoUrl:  res.data.photoUrl}) 
                    } else {
                      console.log('error')
                    }
                  })
                return downloadURL;
            })
            .catch(error => {
                // Use to signal error if something goes wrong.
                console.log(`Failed to upload file and get link - ${error}`);
            });
        },
        deleteVehicle(item) {
        if(confirm("Do you really want to delete?")){
          axios
            .delete("https://ettcars.herokuapp.com/api/vehicles/" + item.id)
            this.vehicles.splice(this.vehicles.indexOf(item), 1)
        }
      },
      editVehicle(item) {
        alert("Edit " + item)
      },
      postData() {
        axios
        .post("https://ettcars.herokuapp.com/api/vehicles", {
          make: this.make,
          model: this.model,
          yearMade: this.yearMade,
          registration: this.registration,
          type: this.type,
          colour: this.colour,
          maxPerson: this.maxPerson,
          status: 0,
          aircon: this.aircon,
          airbags: this.airbags,
          hourRate: this.hourRate,
          dayRate: this.dayRate,
          weekRate: this.weekRate,
          ownerId: this.$cookies.get('userid')
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