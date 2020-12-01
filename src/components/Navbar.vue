<template>
    <div>
        <v-app-bar dark color="blue">

            <span class="hidden-sm-and-up">
                <v-btn @click="drawer = !drawer">Menu</v-btn>
            </span>

            <v-toolbar-title>
                ETT Cars
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-xs-only">
                <v-btn to="/" text>
                    <v-icon small left>dashboard</v-icon>Home
                </v-btn>
                <v-btn to="/users" text>
                    <v-icon small left>person</v-icon>Users
                </v-btn>
                <v-btn to="/vehicles" text>
                    <v-icon small left>time_to_leave</v-icon>Vehicles
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app class="indigo lighten-3">
            <v-list>
                <v-subheader>MENU</v-subheader>
                    <v-list-item-group >
                        <v-list-item v-for="link in links" :key="link.title" :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ link.title }}</v-list-item-title><br>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>

</template>
<script>
    export default{

        data () {
            return {
                drawer: false,
                links: [
                    { icon: 'dashboard', title: 'Dashboard', route: '/' },
                    { icon: 'person', title: 'Users', route: '/users' },
                    { icon: 'time_to_leave', title: 'Vehicles', route: '/vehicles' }
                ]
            }
        }
    }
</script>
<style>

</style>