<template>
    <v-sheet :height="sheetHeight">
        <v-container class="fill-height">
            <v-row align="center" justify="center">
                <h1 class="text-center display-1 hidden-sm-and-up">
                        Welcome to ETT <span dark>Cars</span>
                </h1>
                 <h1 class="text-center display-3 hidden-xs-only" >
                        Welcome to ETT <span dark>Cars</span>
                </h1>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>
    export default {
        computed: {
            sheetHeight() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return '100px'
                case 'sm': return '150px'
                case 'md': return '150px'
                case 'lg': return '150px'
                case 'xl': return '200px'
            }
            return '150px'
            }        
        }   
    }
</script>

<style lang="scss" scoped>

</style>