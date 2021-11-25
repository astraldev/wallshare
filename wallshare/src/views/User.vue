<template>
  <div class="py-2 md:p-0 px-0 flex md:grid grid-cols-2 lg:grid-cols-3 h-full flex-col md:max-h-screen-[90vh] overflow-y-auto">
    <!-- User info -->
    <div class="p-1 border-b-2 md:border-0 lg:col-end-1">
      <div class="pb-3 pl-2 flex">
        <div class="h-32 w-32 rounded-full mx-auto self-center border-2 flex items-center justify-center">
          <img alt='img' :src="uIcon" class="object-cover">
        </div>
        <div class="w-2/3 py-3 px-2 leading-tight text-gray-700">
          <router-link :to='getEditUserLink()' class="font-bold w-full inline-flex text-3xl text-gray-800/90 hover:text-gray-800">
            <span>{{userData.firstName}} {{userData.lastName}} </span>
            <span class="ml-auto mr-4">
              <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 stroke-current">
                <path d="m3.2222 10.222c-.1585.58208-.31744 1.1658-.0008644 1.3923.31657.22654 1.1082.09569 1.6145.23082.50633.13514.72748.53536.9496.93735m5.7751-10.39c-.08202.0001911-.34564.0008051-.42805.0009971-.08241.0001919-.22328.14106-.22328.14106l-.0014-.00138s-7.6815 7.6815-7.6815 7.6815l-.00138-.0014s-.00138.0041-.00138.0041-.00276.0028-.00276.0028l.00138.0014-.47647 1.7498-.44885 1.6449-.031764.11187.10496-.02762 1.6545-.4447s1.7581-.47371 1.7581-.47371h.00276s7.5448-7.5448 7.5448-7.5448l.14087-.14087s.14087-.14087.14087-.22308v-.42943c0-.082215-1.9694-2.0516-2.0514-2.0514z" fill="none" stroke-linejoin="round" stroke-width=".7"/>
              </svg>
            </span>
          </router-link>
          <div v-if='userData.photos && photo_links[0]' class="font-bold">Last updated: <span class="text-sm font-normal"> {{simplifyDate(photo_links[0].created)}} </span></div>
          <div class="font-bold">Photos: <span class="text-sm font-normal"> {{userData.photos}}</span> </div>
        </div>
      </div>
      <div class="flex items-center justify-between space-x-2">
        <router-link :to="getAddPhotoLink()" class="hover:ring-2 hover:ring-blue-300 px-2 py-1.5 w-11/12 text-white m-auto bg-blue-400 rounded-md text-center">Add Photo</router-link>
        <button @click="confirmLogOut" class="hover:ring-2 hover:ring-red-300 px-2 py-1.5 w-11/12 text-white m-auto bg-red-400 rounded-md">Log out</button>
      </div>
    </div>

    <!-- Photo list -->
    <user-photo-container :link="getAddPhotoLink()" class="lg:col-start-1 lg:col-end-4">
      <user-photo-card v-for='(photo, index) in photo_links' :photo='photo' @delete='confirmDeletePhoto(photo._id)' :key='index'/>
      <template #liked>
        <card v-for="(photo, index) in liked_photos" :photo='photo' :hover='false' :key="index" @liked="refreshContent"/>
      </template>
    </user-photo-container>

    <router-view v-slot='{ Component }'>
        <component :is='Component' />   
    </router-view>
    <alert 
      :title="alertData.title" 
      :body="alertData.body" 
      :show='alertData.show'
      :id='alertData.id'
      :declineLabel='alertData.declineLabel'
      @cancel='alertData.declineCallback'
      :acceptLabel='alertData.acceptLabel'
      @accept='alertData.acceptCallback'
    />
  </div>
</template>
<script>
//import TextFormGroup from '@/components/text-form-group.vue'
//import FormHeader from '@/components/form-header.vue' ==> log-out
//import CheckFormGroup from '@/components/check-form-group.vue'
import card from '@/components/card.vue'
import UserPhotoCard from '@/components/user-photo-card.vue'
import UserPhotoContainer from '@/components/user-photo-container.vue'
import axios from 'axios'
import alert from '@/components/alert.vue'
import userIcon from '../../public/wallshare-picture.svg'

export default {
    props: ['uname'],
    components: { card, UserPhotoCard, UserPhotoContainer, alert },
    data(){
      return {
        textForm: "Computer science",
        tags: [],
        value: true,
        userData: [],
        photo_links: [],
        liked_photos: [],
        liked_photos_check: [],
        uIcon: userIcon,
        alertData: {
          show: false,
          title: '',
          body: '',
          id: "",
          acceptLabel: "",
          declineLabel: '',
          acceptCallback: ()=>{},
          declineCallback: ()=>{this.show = false},
        }
      }
    },
    mounted(){
      this.userData = this.$root.userData
      if(!this.userData.userID){
        this.$router.push("/")
      }
      setTimeout(this.refreshContent, 200)
      setInterval(this.refreshContent, 1000)
    },
    methods: {
      getUserIcon(){},
      userExists(){
        axios
          .get(`${this.$root.serverHost}/api/users/exists?id=${this.userData.userID}`)
          .then((res)=>{
            if(!res.data.sucess){
              this.$router.push('/')
            }
          })
          .catch(()=>{
            this.$router.push("/")
            this.$root.showToast("An internal error occured", 'error')
          })
      },
      getAddPhotoLink(){
        return `/user/${this.uname}/addPhoto`
      },
      getEditUserLink(){
        return `/user/${this.uname}/edit`
      },
      populatePhotos(){
        axios
          .get(`${this.$root.serverHost}/api/photos/byUserID?id=${this.userData.userID}`)
          .then((data)=>{
            let out = []
            if(data.data){
              data.data.forEach((item)=>{
                item.link = `${this.$root.serverHost}/images/${item.location}`
                item.created = new Date(item.created).toGMTString()
                out.push(item)
                out.reverse()
              })
              if(out != this.photo_links){
                this.photo_links = out
              }
            }
          })
          .catch((err)=>{console.log("Issues with photo", err)})
        axios
          .get(`${this.$root.serverHost}/api/users/likes?user=${this.userData.userID}`)
          .then(data=>{
            if(data.data){
                let out = []
                data.data.forEach((item)=>{
                  item.link = `${this.$root.serverHost}/images/${item.location}`
                  item.created = new Date(item.created).toGMTString()
                  out.push(item)
                })
                if(out != this.liked_photos){
                  this.liked_photos = out
                }
              }
            })
          .catch(()=>{console.log("Issues with photo")})

      },
      refreshContent(){
        this.$root.refreshContent()
        this.userData = this.$root.userData
        if(this.userData && this.$root.signedIn)
          this.populatePhotos()
      },
      simplifyDate(dateString){
        return dateString.replace("GMT", "").replace(/(\w+,)/, "")
      },
      deletePhoto(photo){
        axios
          .delete(`${this.$root.serverHost}/api/photos/byID?id=${photo}`)
          .then(()=>{
            this.refreshContent()
          })
          .catch(()=>{
            this.refreshContent()
          })
      },
      confirmDeletePhoto(photo){
        if(this.$cookies.get(`showAlert_CONFIRM_DELETE`)){
          this.deletePhoto(photo)
        }else{
          this.alertData.title = 'Confirm delete'
          this.alertData.body = "Are you sure you want to delete this photo. This action can not be undone"
          this.alertData.declineLabel = "No"
          this.alertData.acceptLabel = 'Yes'
          this.alertData.id = 'CONFIRM_DELETE'
          this.alertData.acceptCallback = () => {
            this.deletePhoto(photo)
            this.alertData.show = false
          }
          this.alertData.declineCallback = ()=>{
            this.alertData.show = false
          }
          this.alertData.show = true
        }
      },
      confirmLogOut(){
          this.alertData.title = 'Confirm log out'
          this.alertData.body = "Are you sure you want to Log out."
          this.alertData.declineLabel = "No"
          this.alertData.acceptLabel = 'Yes'
          this.alertData.id = ''
          this.alertData.acceptCallback = () => {
            this.$root.logOut()
            this.$router.push("/")
            this.alertData.show = false
          }
          this.alertData.declineCallback = ()=>{
            this.alertData.show = false
            this.$router.push("/")
          }
          this.alertData.show = true

        }
    }
  }
</script>
<style scoped>
.open-views-enter-active{
  animation: fade-in 300ms 0s ease forwards;
}
.open-views-leave-active{
  animation: fade-out 300ms 0s ease forwards;
}
</style>