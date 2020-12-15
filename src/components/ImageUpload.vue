<template>
    <div class="pa-3">
        <input 
            type="file"
            @change="uploadImage"
            class="d-none"
            accept="image/*"
            ref="imageInput"
        >
        <v-btn @click="$refs.imageInput.click()" >Upload photo</v-btn>
    </div>
</template>
 
<script>
    import firebase from 'firebase';

    export default {
        name: 'Upload',
        data(){
            return{
            imageData: null
            }
        },
        methods:{
            uploadImage(event){
                this.imageData = event.target.files[0];
                const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
                console.log(storageRef)
            }
        }
    }
 
</script>
 
<style>
 
</style>