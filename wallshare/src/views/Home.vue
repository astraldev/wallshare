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
      photos: []
    }
  },
  mounted(){
    this.refreshContent()
    //setInterval(this.refreshContent, 500)
  },
  methods:{
    refreshContent(){
      axios
        .get(`http://${this.$root.serverHost}:3030/api/photos/`)
        .then((data)=>{
          let out = []
          data.data.forEach((item)=>{
            item.link = `http://${this.$root.serverHost}:3030/images/${item.location}`
            out.push(item)
          })
          if(out != this.photos) this.photos = out
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
