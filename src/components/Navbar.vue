<template>
    <div>
        <v-app-bar app dark color="blue">

            <v-toolbar-title>
                ETT Cars
            </v-toolbar-title>

            <!-- USER LOG IN CARD -->
            <v-dialog v-model="logInDialog" width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn id="logInButton" v-bind="attrs" v-on="on" text v-show="localUsername == 0">
                    Log in
                    </v-btn>
                </template>

                <v-card >
                    <v-card-title class="headline grey lighten-2">
                    Log in
                    </v-card-title>

                    <v-card-text>
                        <v-form lazy-validation>
                            <v-text-field v-model="uname" label="Username" required></v-text-field>
                            <v-text-field v-model="pword" label="Password" type="password" required></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <div id="loginMessage"></div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="logInDialog = false">Cancel</v-btn>
                        <v-btn @click="postLoginData">Log in</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- USER LOG OUT CARD -->
            <v-dialog v-model="logOutDialog" width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn id="logOutButton" v-bind="attrs" v-on="on" text v-show="localUsername != 0">
                    Log Out
                    </v-btn>
                </template>

                <v-card >
                    <v-card-title class="headline grey lighten-2">
                        Log out
                    </v-card-title>

                    <v-card-subtitle class="headline grey lighten-2">
                        Are you sure you want to log out?
                    </v-card-subtitle>

                    <v-divider></v-divider>

                    <div id="loginMessage"></div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="logOutDialog = false">No</v-btn>
                        <v-btn @click="postLogOutData">Yes</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- USER REGISTER CARD -->
            <v-dialog v-model="registerDialog" width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn id="registerButton" v-bind="attrs" v-on="on" text v-show="localUsername == 0">
                    Register
                    </v-btn>
                </template>

                <v-card >
                    <v-card-title class="headline grey lighten-2">
                        Register
                    </v-card-title>

                    <v-card-text>
                        <v-form lazy-validation>
                            <v-text-field v-model="fname" label="Firstname" required></v-text-field>
                            <v-text-field v-model="lname" label="Lastname" required></v-text-field>
                            <v-text-field v-model="uname" label="Username" required></v-text-field>
                            <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                            <v-text-field v-model="pword" label="Password" type="password" :rules="passwordRules" required></v-text-field>
                            <v-text-field v-model="pwordconfirm" label="Confirm" type="password" :rules="confirmPasswordRules" required></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="registerDialog = false">Cancel</v-btn>
                    <v-btn @click="postRegisterData">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-spacer></v-spacer>

            <div class="text-center">
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" >
                        <v-icon small left light v-show="localUserStatus == 1">dehaze</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.title" :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>       
                </v-list>
                </v-menu>
            </div>

        </v-app-bar>

    </div>

</template>

<script>
    import axios from 'axios'
    import { EventBus } from './event-bus.js';
 
    export default{

        data () {
            return {

                localUserId: this.$cookies.get('userid') || 0,
                localUsername: this.$cookies.get('username') || 0,
                localUserLevel: this.$cookies.get('userlevel') || 0,
                localUserStatus: this.$cookies.get('userstatus') || 0,

                userType: null,

                uname: null,
                fname: null,
                lname: null,
                email: null,
                pword: null,
                pwordconfirm: null,

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                
                passwordRules: [
                    (value) => !!value || 'Please type password.',
                    (value) => (value && value.length >= 8) || 'minimum 8 characters',
                ],

                confirmPasswordRules: [
                    (value) => !!value || 'type confirm password',
                    (value) =>
                    value === this.pword || 'The password confirmation does not match.',
                ],

                drawer: false,
                logInDialog: false,
                logOutDialog: false,
                registerDialog: false,

                links: [
                    { icon: 'dashboard', title: 'Search', route: '/' },
                    { icon: 'person', title: 'My Account', route: '/myaccount' },
                    { icon: 'time_to_leave', title: 'My Bookings', route: '/mybookings' },
                    { icon: 'time_to_leave', title: 'My Vehicles', route: '/myvehicles' }
                ]
            }
        },
        methods: {
            postLoginData() {
                var self = this
                axios
                .post("https://ettcars.herokuapp.com/api/userlogin", {
                        username: self.uname.toLowerCase(), 
                        password: self.pword
                    })
                .then (res => {
                    console.log(res.data['accessToken'])                 
                    if (res.data['accessToken'] === 'err1') {
                        document.getElementById("loginMessage").innerHTML="Password error"
                    }
                    else if (res.data['accessToken'] === 'err2') {
                        document.getElementById("loginMessage").innerHTML="Not verified"
                    }
                    else {

                        const AuthStr = 'Bearer '.concat(res.data['accessToken'])
                        this.$cookies.set('token', res.data['accessToken'])   

                        axios
                            .get("https://ettcars.herokuapp.com/api/userlogin/usersauth", { 
                                headers: { Authorization: AuthStr } 
                                })
                            
                            .then(res => {

                                this.$cookies.set('userid', res.data[0]['id'])   
                                this.$cookies.set('username', res.data[0]['username'])   
                                this.$cookies.set('userlevel', res.data[0]['userlevel'])   
                                this.$cookies.set('userstatus', 1)

                                EventBus.$emit('loggedIn', 1);

                                this.localUserStatus = 1
                                this.localUserId = res.data[0]['id'];
                                this.localUserLevel = res.data[0]['userlevel']
                                this.localUsername = res.data[0]['username']
                        
                                self.logInDialog = false
                            })
                            .catch(() => {
                                document.getElementById("loginMessage").innerHTML="Token error"
                            });
                    }
                })                  
            },

            postLogOutData() {
                this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
                this.localUserId = 0
                this.localUsername = 0
                this.localUserLevel = -1
                this.localUserStatus = 0
                this.logOutDialog = false
                
                EventBus.$emit('loggedIn', 0);

                this.$router.push('/')  //NOT HAPPY IF ALREADY ON THIS VIEW
            },

            postRegisterData() {
                axios
                .post("https://ettcars.herokuapp.com/api/users", {
                    firstname: this.fname,
                    lastname: this.lname,
                    username: this.uname,
                    email: this.email,
                    userlevel: 0,
                    password: this.pword
                });
                this.registerDialog = false;  
            }
        }
    }
</script>

<style>

</style>