<template>
    <backdrop :show='!close' @close="closeModal">
      <form-div :clip="true" clip_class="bg-blue-500" @submit='onSubmit' >
        <form-header title="Register" />
        <text-form-group name='name' class="z-20" label="Name" placeholder="Joe Nick" :validate='v_Name' v-model='name' required />
        <text-form-group name='username' class="z-20" label="Username" :error='userExists' placeholder="e.g joenick" v-model='usrname' :validate='v_Username' required/>
        <text-form-group name='email' class="z-20" label="Email" :error='emailExists' placeholder="e.g joenick@gmail.com" v-model='email' type="email" required/>
        <text-form-group name='password' class="z-20" label="Password" type="password" placeholder="Password" :validate='v_Pass' v-model='password' required/>
        <check-form-group name='check' class="z-20" label="I agree to all" link_label="terms and conditions" v-model='agreeToTerms' link_to="/" :router="true"  type="checkbox" />
        <empty-form>
          <span>Already a member <router-link to="/sign-in">Sign in</router-link> </span>
        </empty-form>
        <button-form-group :labels="[{label: 'Close', callback: closeModal }, {label: 'Register', type: 'submit'}]"/>
      </form-div>
    </backdrop>
</template>
<script>
import backdrop from '@/components/backdrop.vue'
import TextFormGroup from '@/components/text-form-group.vue'
import CheckFormGroup from '@/components/check-form-group.vue'
import ButtonFormGroup from '@/components/button-form-group.vue'
import EmptyForm from '@/components/empty-form-group.vue'
import FormHeader from '@/components/form-header.vue'
import FormDiv from '@/components/form-div.vue'

import axios from 'axios'

export default {
  components: { backdrop, TextFormGroup, CheckFormGroup, ButtonFormGroup, FormDiv, EmptyForm, FormHeader},
  data(){
    return {
      close: false,
      //Form Data
      name: '',
      usrname: '',
      email: '',
      password: '',
      agreeToTerms: true,
      //Already exists
      userExists: false,
      emailExists: false,
    }
  },
  methods:{
    validateAll(){
      if(this.v_Name(this.name).sucess && 
        this.v_Username(this.usrname).sucess && 
        this.v_Email(this.email).sucess && 
        (this.password.length > 5)
      ){
        return true
      }else{
        return false
      }
    },
    logIn(data){
      if(!data.data.userID){
        return false
      }
      this.$root.userData = data.data
      this.$root.signedIn = true
      this.$router.push("/")
      if(this.$cookies.get("allows")){
        this.$cookies.set('id', data.data.userID.split("").reverse().join(""), {expires: '1d'}) 
      console.log("Saved data")
      }
    },
    onSubmit(){
      if(this.validateAll()){
        var data = {
          firstName: this.name.split(" ")[0],
          lastName: this.name.split(" ")[1],
          userName: this.usrname,
          email: this.email,
          password: this.password
        }
         axios
          .get(`${this.$root.serverHost}/api/users/find?userName=${data.userName}&email=${data.email}`)
          .then((res)=>{
            if(!res.data.sucess){
              this.userExists = false
              this.emailExists = false
              axios
                .post(`${this.$root.serverHost}/api/users/new`, data)
                .then(()=>{
                  axios.get(`${this.$root.serverHost}/api/users/signin?userName=${data.userName}&password=${data.password}`)
                    .then(this.logIn)
                    .catch((e)=>{console.log(e)})
                  })
                .catch(()=>{
                  console.log("Error")
                })
            }else{
              if(res.data.email){
                this.emailExists = 'Email has already been used'
              }
              if(res.data.userName){
                this.userExists = 'Username has already been used'
              }
            }
          })
          .catch(()=>{
            //this.$root.showToast("An internal error occured")
            this.$router.push("/")
          })
        
      }
    },
    closeModal(){
      this.close = true
      this.$router.push("/")
      this.close = false
    },
    v_Pass(val){
      let res = {
        sucess: true,
        info: ''
      }
      if(val.length > 6){
        res.sucess = true
      }else{
        res.sucess = false
        res.info = 'Password must be more than 6 characters'
      }
      return res
    },
    v_Username(val){
      let names = val.split(' ')
      let res = {
        sucess: true,
        info: ''
      }
      if(val.trim() == ''){
        return res
      }
      else{
        if(names.length > 1){
          res.sucess = false
          res.info = 'No space allowed'
        }
      }
      return res
    },
    v_Name(val){
      let names = val.trim().split(" ")
      let res = {
        sucess: true,
        info: ''
      }
      if(val.trim() == ''){
        return res
      }
      if(names.length == 2 ){
        if( (names[0].length < 2) || (names[1].length < 2) ){
          res.sucess = false
          res.info = 'Names should be more than 3 letters'
        }
      }else if(names.length > 2){
        res.sucess = false
        res.info = 'Input only your two names'
      }else{
        res.sucess = false
        res.info = 'Input your two names'
      }
      return res
    },
    v_Email(val){
      let res = {
        sucess: true,
        info: ''
      }
      if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)){
        res.sucess = true
      }else if(!val){
        res.info = ''
      }else{
        res.info = 'Input a valid email'
      }
      return res
    }
  }
}
</script>
