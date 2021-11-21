<template>
  <div class="w-full mx-auto rounded flex flex-shrink overflow-hidden transform transition duration-400 hover:scale-[1.001] relative border">
   <img class="card-img h-auto w-full flex" :src="photo.link" />
   <div class="text-white absolute bottom-0 left-0 right-0 p-4 flex flex-col font-light max-h-[35vh] bg-blur backdrop-blur">
     <div class="flex justify-between items-center text-blue-500 font-medium py-2 px-1">
       <router-link to="/">{{photo.ownerName ? photo.ownerName : ''}} {{getUserName(photo)}}</router-link> 
       <span class="w-7 h-7 text-white"><svg
        class="stroke-current w-full h-full"
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
        d="m2.0696 21.672a7.4767 9.83 89.256 015.0337-6.6283 7.4767 9.83 89.256 0110.029.14267 7.4767 9.83 89.256 014.5778 6.765"
        fill="none"
        stroke-width="3"
        />
        <ellipse
        cx="11.658"
        cy="9.1741"
        rx="4.75"
        ry="5"
        fill="none"
        stroke-width="3"
        />
      </svg></span>
    </div>
    <div class="flex py-1 px-1 flex-wrap w-full">
      <span v-for="(tag, index) in photo.tags" :key="index" class="py-1 px-2.5 inline-flex items-center justify-center m-1.5 ml-0 border-2 border-blue-600 rounded-full">
        <router-link to="/" class="text-white text-sm font-medium text-center">{{tag}}</router-link>
      </span>
    </div>
    <div class="flex justify-between p-2 items-center">
     <div>{{countView}} Downloads</div>
     <div class="flex items-center">
      <button class="p-1 bg-white rounded p-1 text-transparent mr-2" @click="likePhoto">
       <svg :class="`w-6 h-6 stroke-current ${likedPhoto ? 'fill-current hover:fill-[transparent]' : 'fill-[transparent] hover:fill-current'} transition-colors duration-300 text-red-500`" enable-background="new 0 0 471.701 471.701" version="1.1" viewBox="0 0 471.7 471.7" xmlns="http://www.w3.org/2000/svg">
        <path 
        d="m138.48 49.936c-47.876 1.255-93.693 34.222-108.09 80.53-15.039 43.837-.5871 94.979 34.21 125.33 54.813 54.586 109.2 109.65 164.29 163.94l.0385.0385.0471.0262c3.0938 1.845 5.977 2.3071 8.638 1.8185 2.661-.48862 5.0843-1.905 7.3489-3.7347 4.5292-3.6594 8.4797-9.001 12.375-12.261l.0157-.014.0139-.014c53.767-53.873 108.17-107.15 161.54-161.41l.007-.007.007-.009c39.859-44.471 37.378-118.04-5.7803-159.49-39.666-41.539-110.43-45.804-154.92-9.5761-.002.0015-.004.0038-.005.0053-.00089.000815-.003.000894-.004.0018-8.0704 6.2372-14.904 13.792-22.113 20.864-20.266-22.351-46.321-40.815-77.045-44.584-6.8385-1.1688-13.722-1.6379-20.562-1.4586z" stroke-width='35px' />
      </svg>
    </button>
      <button class="text-gray-700 bg-white rounded p-1 flex items-center justify-between hover:text-gray-900 disabled:bg-gray-200" @click='download' :disabled="downloaded">
        <svg version="1.1" class="stroke-current h-6 w-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" v-if="!downloaded">
          <g fill="none" stroke="" stroke-linecap="round" stroke-linejoin="round">
            <path d="m1.8044 8.4911v3.8446c0 .44184.35635.79819.79819.79819h10.795c.44184 1e-6.79819-.35635.79819-.79819v-3.8446" stroke-width=".93"/>
            <path d="m7.8674 2.4143v8.1683" stroke-width=".9px"/>
            <path d="m11.42 6.6685-3.5522 4.2891" stroke-width=".9px"/>
            <path d="m4.3152 6.6685 3.5522 4.2891" stroke-width=".9px"/>
          </g>
        </svg>
        <svg version="1.1" class="h-6 w-6 animate-spin" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" v-else-if="downloadAnimation" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient id="a">
              <stop stop-color="#000400" offset="0"/>
              <stop stop-color="#fff" offset="1"/>
            </linearGradient>
            <linearGradient id="c" x1="4.1345" x2="12.615" y1="5.4747" y2="6.6679" gradientTransform="translate(-19.068,-7.9064)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
            <linearGradient id="b" x1="4.1345" x2="12.615" y1="5.4747" y2="6.6679" gradientTransform="translate(-18.272,-4.8548)" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
          </defs>
          <g transform="matrix(1.6696 0 0 1.5455 -5.3563 -1.861)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1">
            <path transform="rotate(210)" d="m-13.14-4.0296a3.425 3.425 0 013.7952-1.0169 3.425 3.425 0 012.2536 3.2185" stroke="url(#c)" style="paint-order:normal"/>
            <path transform="matrix(-.86603 -.5 -.5 .86603 0 0)" d="m-13.145 1.2236a3.425 3.425 0 012.2536-3.2185 3.425 3.425 0 013.7952 1.0169" stroke="url(#b)" style="paint-order:normal"/>
          </g>
        </svg>
        <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="stroke-current h-6 w-6 text-green-400 " v-else>
          <path d="m2.3001 8.8432 3.7178 3.5318 7.6832-8.7366" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5236"/>
        </svg>
      </button>
</div>
</div>
</div>
</div>
</template>
<script>
  import axios from  'axios'
  export default {
    props: ['photo'],
    emits: ['liked'],
    data(){
      return {
        countView: 0,
        d_photo: {},
        showDownload: false,
        startDownload: false,
        likedPhoto: false,
        downloaded: false,
        downloadAnimation: true
      }
    },
    mounted(){
      this.ifLiked()
      setInterval(this.ifLiked, 2000)
    },
    methods: {
      ifLiked(){
        if(this.$root.signedIn){
          axios
            .get(`http://${this.$root.serverHost}:3030/api/users/likes?id=${this.photo._id}&user=${this.$root.userData.userID}`)
            .then(data=>{
              if(data.data.sucess) 
                this.likedPhoto = true
              else
                this.likedPhoto = false
              })
            .catch(()=>{
              this.likedPhoto = false
            })
        }
      },
      getUserName(photo){
        axios
        .get(`http://${this.$root.serverHost}:3030/api/users/byID?id=${photo.owner}`)
        .then((data)=>{
          let res = data.data.firstName + " " + data.data.lastName
          photo.ownerName = res
        })
        .catch(()=>{
          return ""
        })
      },
      likePhoto(){
        console.log(this.photo, this.$root.userData.userID)
        if(!this.$root.signedIn) this.$router.push('/sign-in')
        else{
         this.liked()
         this.$emit("liked")
        }
      },
      liked(){
        this.likedPhoto = !this.likedPhoto
        if(this.likedPhoto){
          axios
            .put(`http://${this.$root.serverHost}:3030/api/users/likePhoto`, {photo: this.photo._id, user: this.$root.userData.userID})
            .then(()=>{console.log("Liked photo")})
            .catch(()=>{
              this.likedPhoto = false
            })
        }else{
          axios
            .put(`http://${this.$root.serverHost}:3030/api/users/unlikePhoto`, {photo: this.photo._id, user: this.$root.userData.userID})
            .then(()=>{console.log("unliking photo")})
            .catch(()=>{console.log("Couldn't unlike photo")})
        }
      },
      download(){
        this.downloaded = true
        setTimeout(()=>{this.downloadAnimation = false}, 1000)
      }
    }

  }
</script>
<style>
.card-img{
  object-fit: fit;
  object-position: center;
}
.bg-blur{
  background: rgba(0, 0, 0, 0.6);
}
.underline-dotted{
  text-decoration-line: underline;
  text-decoration-style: dotted;
}
</style>
