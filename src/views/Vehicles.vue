<template>

  <v-container mb-12>

    <v-row>
      <v-col sm="10" offset-sm="1" md="8" offset-md="2">
          <v-row>
            <v-col sm="6" md="12" v-for="item in vehicles" :key="item.id">
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
           model: 0,
          vehicles: null
        };
      },
      created: function () {
        axios
          .get('https://ettcars.herokuapp.com/api/vehicles')
          .then (res => {

              console.log(res.data)

              this.vehicles = res.data;
              console.log('Vehicle data:')
              console.log(res.data[0])
          })
      }
    }
</script>
<style>
 

</style>