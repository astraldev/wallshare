<template>
  <div class="py-2 px-0 flex h-full flex-col md:max-h-screen-[90vh] overflow-y-auto">
    <!-- User info -->
    <div class="p-2 border-b-2 ">
      <div class="pb-3 pl-3 flex">
        <div class="h-32 w-32 rounded-full mx-auto self-center border-2 flex items-center justify-center">
          <img alt='img' :src="uIcon" class="object-cover">
        </div>
        <div class="w-2/3 py-3 px-2 leading-tight text-gray-700">
          <div class="font-bold text-3xl text-gray-800">{{userData.firstName}} {{userData.lastName}}</div>
          <div v-if='userData.photos && photo_links[0]' class="font-bold">Last updated: <span class="text-sm font-normal"> {{simplifyDate(photo_links[0].created)}} </span></div>
          <div class="font-bold">Photos: <span class="text-sm font-normal"> {{userData.photos}}</span> </div>
        </div>
      </div>
      <div class="flex items-center justify-between space-x-2">
        <router-link :to="getAddPhotoLink()" class="hover:ring-2 hover:ring-blue-300 px-2 py-1.5 w-11/12 text-white m-auto bg-blue-400 rounded-full text-center">Add Photo</router-link>
        <button @click="confirmLogOut" class="hover:ring-2 hover:ring-red-300 px-2 py-1.5 w-11/12 text-white m-auto bg-red-400 rounded-full">Log out</button>
      </div>
    </div>

    <!-- Photo list -->
    <user-photo-container :link="getAddPhotoLink()">
      <user-photo-card v-for='(photo, index) in photo_links' :photo='photo' @delete='confirmDeletePhoto(photo._id)' :key='index'/>
      <template #liked>
        <card v-for="(photo, index) in liked_photos" :photo='photo' :key="index" @liked="refreshContent"/>
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
      setTimeout(this.refreshContent, 500)
      setInterval(this.refreshContent, 5000)
    },
    methods: {
      getUserIcon(){},
      userExists(){
        axios
          .get(`http://${this.$root.serverHost}:3030/api/users/exists?id=${this.userData.userID}`)
          .then((res)=>{
            //this.$root.showToast("No such user")
            if(!res.data.sucess){
              this.$router.push('/')
            }
          })
          .catch(()=>{
            //this.$root.showToast("An internal error occured")
            this.$router.push("/")
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
          .get(`http://${this.$root.serverHost}:3030/api/photos/byUserID?id=${this.userData.userID}`)
          .then((data)=>{
            let out = []
            data.data.forEach((item)=>{
              item.link = `http://${this.$root.serverHost}:3030/images/${item.location}`
              item.created = new Date(item.created).toGMTString()
              out.push(item)
              out.reverse()
            })
            if(out != this.photo_links){
              this.photo_links = out
            }
          })
        axios
          .get(`http://${this.$root.serverHost}:3030/api/users/likes?user=${this.userData.userID}`)
          .then(data=>{
            if(data.data){
                console.log(data.data)
              }
            })
      },
      refreshContent(){
        this.$root.refreshContent()
        this.userData = this.$root.userData
        this.populatePhotos()
      },
      simplifyDate(dateString){
        return dateString.replace("GMT", "").replace(/(\w+,)/, "")
      },
      deletePhoto(photo){
        axios
          .delete(`http://${this.$root.serverHost}:3030/api/photos/byID?id=${photo}`)
          .then(()=>{
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
@keyframes fade-out{
  from{opacity: 1;}
  to{opacity: 0;}
}
@keyframes fade-in{
  from{opacity: 0;}
  to{opacity: 1;}
}
</style>