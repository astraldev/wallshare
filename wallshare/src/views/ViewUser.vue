<template>
  <div class="py-2 md:p-0 px-0 flex md:grid grid-cols-2 divide-x-2 lg:grid-cols-3 divide-gray-200 h-full flex-col md:max-h-screen-[90vh] overflow-y-auto">
    <!-- User data -->
    <div class="p-1 border-b-2 md:border-0 lg:col-end-1">
      <div class="pb-3 pl-2 flex">
        <div class="h-32 w-32 rounded-full mx-auto self-center border-2 flex items-center justify-center">
          <img alt='img' class="object-cover">
        </div>
        <div class="w-2/3 py-3 px-2 leading-tight text-gray-700">
          <div class="font-bold w-full inline-flex text-2xl text-gray-800/90 hover:text-gray-800">
            <span>{{user.firstName + " " + user.lastName}}</span>
          </div>
          <div v-if='photos' class="font-bold">Last upload: <span class="text-sm font-normal"> {{getLastUpload()}} </span></div>
          <div class="font-bold">Photos: <span class="text-sm font-normal"> {{user.photos}}</span> </div>
          <div class="font-bold">Impact: <span class="text-sm font-normal"> {{user.totalDownloads || '0'}} persons</span> </div>
        </div>
      </div>
      <div class="flex items-center justify-between space-x-2">
        <button @click="followUser" :class="`px-2 py-1.5 w-11/12 text-white m-auto h-9 rounded-md text-center ${getFollowed() ? 'bg-gray-400' : 'hover:ring-2 hover:ring-blue-100 bg-blue-400'}`">{{`${getFollowed() ? 'Unfollow' : 'Follow'}`}}</button>
        <button @click="notification" class="hover:ring-2 hover:ring-gray-200 p-0.5 w-1/6 text-white m-auto flex justify-center items-center bg-gray-400 rounded-md">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.999 611.999" style="enable-background:new 0 0 611.999 611.999;" xml:space="preserve" class="fill-current w-8 h-8">
              <g>
                <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203
                  C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578
                  c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626
                  h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856
                  c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626
                  C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32
                  c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082
                  c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z
                   M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826
                  c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485
                  c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"/>
                <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258
                  c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258
                  C323.259,126.96,315.532,119.235,306.001,119.235z"/>
              </g>
            </svg>
        </button>
      </div>
      <photo-container>
        <card v-for='(ph, ind) in photos' :key='ind' :photo='ph' />
      </photo-container>
    </div>
  </div>
</template>
<script>
import card from "@/components/card.vue"
import PhotoContainer from '@/components/photo-container'
import axios from 'axios'
export default {
  props: ['uname'],
  components: {card, PhotoContainer},
  data(){
    return {
      user: {},
      photos: {}
    }
  },
  mounted(){
    /** Connect to the server and get user info */
    this.refreshContent()
  },
  methods: {
    refreshContent(){
      axios
      .get(`${this.$root.serverHost}/api/users/byID?id=${this.uname.split("@")[1]}`)
      .then((res)=>{
        if(!res.data){
          this.$router.push("/")
        }
        if(res.data.firstName.toLowerCase() === this.uname.split("@")[0]){
          this.user = res.data 
          this.populatePhotos()
        }
      })
    },
    getLastUpload(){
      if(this.photos.length > 1){
        return this.simplifyDate(this.photos[this.photos.length-1].created)
      }else if(this.photos.length == 1){
        return this.simplifyDate(this.photos[0].created)
      }
    },
    getFollowed(){},
    simplifyDate(dateString){
      return dateString.replace("GMT", "").replace(/(\w+,)/, "")
    },
    populatePhotos(){
        axios
          .get(`${this.$root.serverHost}/api/photos/byUserID?id=${this.user.userID}`)
          .then((data)=>{
            let out = []
            if(data.data){
              data.data.forEach((item)=>{
                item.link = `${this.$root.serverHost}/images/${item.location}`
                item.created = new Date(item.created).toGMTString()
                out.push(item)
                out.reverse()
              })
              if(out != this.photos){
                this.photos = out
              }
            }
          })
          .catch((err)=>{console.log("Issues with photo", err)})
    }
  },
}
</script>