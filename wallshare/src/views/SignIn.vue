<template>
 <backdrop :show='showModal' @close='closeModal'>
  <form-div :clip='true' class="text-gray-700" @submit='onSubmit'>
    <h1 class="font-bold text-4xl z-20 p-4 text-center relative"> Sign in </h1>
    <text-form-group placeholder="Username" label="Username" v-model='usrname' @change="onChange" :error="un_error" required/>
    <text-form-group type="password" placeholder="Password" label="Password"   @change="onChange" :error="p_error" v-model='password' required/>
    <empty-form>
      Not yet a member <router-link to="/register">Register</router-link>
    </empty-form>
    <button-form-group :labels="[{label: 'Close', callback: closeModal}, {label: 'Sign in', type: 'submit'}]" />
  </form-div>
</backdrop>   
</template>
<script>
  import ButtonFormGroup from  '@/components/button-form-group'
  import TextFormGroup from  '@/components/text-form-group'
  import backdrop from '@/components/backdrop'
  import EmptyForm from '@/components/empty-form-group'
  import FormDiv from '@/components/form-div.vue'
  import axios from 'axios'
  export default {
    data(){
      return {
        showModal: true,
        usrname: '',
        password: '',
        un_error: '',
        p_error: ''
      }
    },
    components: {TextFormGroup, ButtonFormGroup, FormDiv, backdrop, EmptyForm},
    methods: {
      closeModal(){
        this.showModal = false
        this.$router.back()
        this.showModal = true
      },
      validateAll(){
        //console.log(!!this.username && !!this.password)
        //if(!!this.username && !!this.password){
          return true
        //} return false
      },
      submitSucess(data){
        if(!data.data.userID){
          this.un_error = "Username may not be correct"
          this.p_error = 'Password may be incorrect'
          return false
        }

        this.$root.userData = data.data
        if(this.$cookies.get("allows")){
          this.$cookies.set('id', data.data.userID.split("").reverse().join(""), {expires: '1d'}) 
          
        }
        this.$root.signedIn = true
        this.$router.back()
      },
      submitFailed(){
        console.log('failed')
        this.un_error = "Request failed"
      },
      onSubmit(){
        let data = {
          username: this.usrname,
          password: this.password
        }
        if(this.validateAll()){
          axios.get(`${this.$root.serverHost}/api/users/signin?userName=${data.username}&password=${data.password}`)
            .then(this.submitSucess)
            .catch(this.submitFailed)
        }
      },
      onChange(val){
        if(val == this.username){
          this.un_error = ''
        }else{
          this.p_error = ''
          this.un_error = ''
        }
      }
    }
  }
</script>
