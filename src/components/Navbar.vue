<template>
    <nav>
        <v-toolbar flat app class="grey">
            
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey -- text">
                <span class="font-weight-light">ETT </span>
                <span>Cars </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn flat color="grey">
                <span>Log out</span>
                <v-icon right>exit_to_app</v-icon>

            </v-btn>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="indigo lighten-3">
            <v-list>
                <v-list-title v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title><br>
                    </v-list-tile-content>
                </v-list-title>
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