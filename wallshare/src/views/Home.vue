<template>
    <photo-container>
      <card v-for='(ph, ind) in photos' :key='ind' :photo='ph' />
    </photo-container>
</template>

<script>
// @ is an alias to /src

import card from "@/components/card.vue"
import im1 from '../../static/images/img-1.jpg'
import im2 from '../../static/images/img-2.jpg'
import im3 from '../../static/images/img-3.jpg'
import im4 from '../../static/images/img-4.jpg'
//import im5 from '../../static/images/img-5.jpeg'
import im6 from '../../static/images/img-6.jpeg'
import im7 from '../../static/images/img-7.jpeg'
import PhotoContainer from '@/components/photo-container'
import axios from 'axios'

export default {
  name: 'Home',
  components: { PhotoContainer, card },
  data(){
    return {
      images: [im1, im2, im4, im6, im7, im3],
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