<template>
    <photo-container>
      <card v-for='(ph, ind) in photos' :key='ind' :photo='ph' />
    </photo-container>
</template>

<script>
// @ is an alias to /src

import card from "@/components/card.vue"
import PhotoContainer from '@/components/photo-container'
import axios from 'axios'

export default {
  name: 'Home',
  components: { PhotoContainer, card },
  data(){
    return {
      showCookieToast: false,
      saveCookie: false,
      file: '',
      error: '',
      photos: []
    }
  },
  mounted(){
    this.refreshContent()
    //setInterval(this.refreshContent, 500)
  },
  methods:{
    refreshContent(){
      console.log(`${this.$root.serverHost}/api/photos/`)
      axios
        .get(`${this.$root.serverHost}/api/photos/`)
        .then((data)=>{
          let out = []
          data.data.forEach((item)=>{
            item.link = `${this.$root.serverHost}/images/${item.location}`
            out.push(item)
          })
          if(out != this.photos) this.photos = out
        })
        .catch((data)=>{
          console.log("Another error", data)
          this.error = data
        })
    },
    getUserLink(){
      if(this.$root.signedIn){
        return `/user/${this.$root.userData.userID}`
      }
    }
  }
}
</script>