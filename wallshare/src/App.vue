<template>
  <transition name='fade'>
    <div v-if='animation || !dataGotten' class="backdrop-filter w-full fixed flex top-0 bottom-0 h-full bg-gray-100 backdrop-blur-md">
      <svg version="1.1" viewBox="0 0 64 64" :class='`h-64 w-64 m-auto transition ${animation ? "animation-1" : "animation-2"}`' xmlns="http://www.w3.org/2000/svg">
        <path ref="svg" d="m20.348 57.94c6.3889-4.5764 18.336-7.092 25.902-11.98 7.5654-4.8876 13.849-9.7084 14.424-20.25-.46037-11.015-9.0395-14.095-15.49-13.843-11.234.004245-21.524 18.685-18.817 21.964 31.921-20.064 21.871 5.2966-6.0186 24.108zm23.304-51.881c-6.3889 4.5764-18.336 7.092-25.902 11.98-7.5654 4.8876-13.849 9.7084-14.424 20.25.46037 11.015 9.0395 14.095 15.49 13.843 11.234-.004245 21.524-18.685 18.817-21.964-31.921 20.064-21.871-5.2966 6.0186-24.108z" />
      </svg>
    </div>
    <div class="w-full h-full" v-else>
      <navbar :signedin='!!signedIn' :userData='userData'/>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
      <message-box :customButton='true' :show='showCookieToast'>
        <span class="text-center p-2">This site uses cookies to enhance user experience </span>
        <div class="flex space-x-2 w-full" >
          <button class="bg-red-400/90 hover:bg-red-400 rounded-md text-white w-1/2 p-1" @click='declineCookie'>No, thanks</button>
          <button class="bg-green-400/90 hover:bg-green-400 rounded-md text-white w-1/2 p-1" @click='acceptCookie'>Got it</button>
        </div>
      </message-box>
     <!--  <message :type='' /> -->
    </div>
  </transition>
</template>
<script>
import '../public/style.css'
import navbar from './components/navbar.vue'
import messageBox from './components/message-box.vue'

import axios from 'axios'

var ip = require('address').ip

export default {
  components: { navbar, messageBox },
  data(){
    return {
      signedIn: false,
      userData: {},
      showCookieToast: false,
      saveCookie: false,
      serverHost: 'localhost',
      animation: true, 
      dataGotten: false
    }
  },
  mounted(){
    let checkIfCookiesAviliable = ()=>{
      if(this.$cookies.get("allows")){
        if(this.$cookies.get("id")){
          let id = this.$cookies.get('id')
          console.log(id)
          if(id){
            id = id.split("").reverse().join("")
            this.getUser(id)
          }else{
            this.$cookies.remove("id")
            this.dataGotten = true
          }
        }else{
          this.dataGotten = true
        }
      }else{
        setTimeout(() => {this.showCookieToast = true}, 1500)
      }
    }
    checkIfCookiesAviliable()
    this.serverHost = ip() ? ip() : 'localhost'  

    setInterval(this.refreshContent, 5000)
    setTimeout(()=>{this.animation = false}, 2000)
  },
  methods :{
    refreshContent(){
      console.log(this.userData.userID, 0)
      if(this.userData.userID){
        this.getUser(this.userData.userID)
      }
      this.serverHost = ip() ? ip() : 'localhost' 
    },
    getUser(id){
      axios
        .get(`http://${this.serverHost}:3030/api/users/byID?id=${id}`)
        .then(this.userGotten)
        .catch(this.logInFailed)
    },
    acceptCookie(){
      this.showCookieToast = false
      this.saveCookie = true
      this.$cookies.set("allows", true, {expires: '1d'})
    },
    declineCookie(){
      this.showCookieToast = false
      this.saveCookie = false
    },
    logInFailed(){
      console.log("Failed to sign in ")
    },
    userGotten(data){
      if(!(data.data && data.data.userID)){
        return
      }
      this.userData = data.data
      this.signedIn = true
      setTimeout(()=>{this.dataGotten = true}, 3000)
    },
    logOut(){
      this.$cookies.remove("id")
      this.userData = {}
      this.signedIn = false

    }
  }
}
</script>
<style scoped>
.animation-1{
  stroke-width: 0.5px;
  stroke: #444;
  fill: transparent;
  stroke-dasharray: 344 ;
  stroke-dashoffset: 0 ;
  animation: animate-1 1.5s 0s 1 linear forwards;
}.animation-2{
  fill: #666; 
  stroke-width: 0px;
  animation: scaleXY 1s 0s infinite linear forwards;
}
.fade-enter-active{
  position: fixed;
  top: 0;
  animation: fade-in 200ms 0s 1 forwards;
}
.fade-leave-active{
  animation: fade-out 200ms 0s 1 forwards;
}
@keyframes fade-in{
  from{opacity: 0;}
  to{opacity: 1;}
}
@keyframes fade-out{
  from{opacity: 1;}
  to{opacity: 1;}
}
@keyframes animate-1{
  0%{stroke-dashoffset: 344;}
  95%{stroke-dashoffset: 0;}
  100%{fill: #666; stroke-width: 0px;}
}@keyframes scaleXY{
  to{transform: scale(1.1);}
}
</style>


