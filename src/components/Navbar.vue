<template>
    <nav>
        <v-toolbar  class="grey">
            
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey -- text">
                <span class="font-weight-light">ETT </span>
                <span>Cars </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="grey">
                <span>Log out</span>
                <v-icon right>exit_to_app</v-icon>

            </v-btn>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="indigo lighten-3">
            <v-list>
                <v-subheader>MENU</v-subheader>
                    <v-list-item-group >
                        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ link.text }}</v-list-item-title><br>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>

</template>
<script>


    export default{


        data () {
            return {
                drawer: false,
                links: [
                    { icon: 'dashboard', text: 'Dashboard', route: '/' },
                    { icon: 'person', text: 'Users', route: '/users' },
                    { icon: 'time_to_leave', text: 'Vehicles', route: '/vehicles' }
                ]
            }
        }
    }
</script>
<style>

</style>