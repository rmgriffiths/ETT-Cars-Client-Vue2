<template>
    <div>
        <v-app-bar dark color="blue">

            <span class="hidden-sm-and-up">
                <v-btn @click="drawer = !drawer">Menu</v-btn>
            </span>

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
            
            <!-- LOGGED IN MESSAGE -->
            <div id="loggedInUser" v-show="localUsername != 0">{{localUsername}}</div>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-xs-only">
                <v-btn to="/" text>
                    <v-icon small left>dashboard</v-icon>Home
                </v-btn>
                <v-btn to="/users" text v-show="localUserLevel == 1">
                    <v-icon small left>person</v-icon>Manage Users
                </v-btn>
                <v-btn to="/allvehicles" text v-show="localUserLevel == 1">
                    <v-icon small left>time_to_leave</v-icon>Manage Vehicles
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- DRAWER -->
        <v-navigation-drawer v-model="drawer" app class="indigo lighten-3">
            <v-list>
                <v-subheader>MENU</v-subheader>
                    <v-list-item-group >
                        <v-list-item v-for="link in links" :key="link.title" :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    </div>

</template>
<script>
    import axios from 'axios';
    import bcryptjs from 'bcryptjs';

    export default{

        data () {
            return {

                //Gets local storage values
                get localUsername() {
                    return localStorage.getItem('username') || 0;
                },
                get localUserLevel() {
                    return localStorage.getItem('userlevel') || 0;
                },

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
                    { icon: 'dashboard', title: 'Dashboard', route: '/' },
                    { icon: 'person', title: 'Users', route: '/users' },
                    { icon: 'time_to_leave', title: 'Manage Vehicles', route: '/allvehicles' }
                ]
            }
        },
        methods:{
            postLoginData() {

                var self = this
                //this.$refs.form.reset() 

                axios
                .post("https://ettcars.herokuapp.com/api/userlogin", {
                  username: self.uname})
                .then (res => {
                    if (res.data.length == 1) {
                        
                        const dbpword = res.data[0].password
                        var resdata = res.data[0]

                        bcryptjs.compare(self.pword, dbpword, function(err, res) {
                            if (err){
                                // handle error
                            }
                            if (res) {
                                localStorage.username = resdata.username
                                localStorage.userlevel = resdata.userlevel
                                
                                document.getElementById("loggedInUser").innerHTML=resdata.username
                                document.getElementById("logInButton").style.display="none"
                                document.getElementById("registerButton").style.display="none"
                                document.getElementById("logOutButton").style.display="inline"
                                
                                self.logInDialog = false
                            }
                            else {
                                document.getElementById("loginMessage").innerHTML="Password failed"
                            }
                        });
                    }
                    else {

                        document.getElementById("loginMessage").innerHTML="Login failed"
                    }

                })                  
            },

            postLogOutData() {
                localStorage.username = ''
                localStorage.userlevel = 0
                document.getElementById("loggedInUser").innerHTML=""
                document.getElementById("logInButton").style.display="inline"
                document.getElementById("registerButton").style.display="inline"
                document.getElementById("logOutButton").style.display="none"
                this.logOutDialog = false            
            },

            postRegisterData() {

                const fname = this.fname
                const lname = this.lname
                const uname = this.uname
                const email = this.email
                
                bcryptjs.hash(this.pword, 10, function(err, hash) {

                    axios.post("https://ettcars.herokuapp.com/api/users", {
                    firstname: fname,
                    lastname: lname,
                    username: uname,
                    email: email,
                    userlevel: 0,
                    password: hash
                    })

                });

                this.registerDialog = false;  

            }
        }
    }
</script>
<style>

</style>