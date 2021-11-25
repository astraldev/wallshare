<template>
  <backdrop :show='showModal' @close='closeModal'>
    <form-div :clip='true' @submit="submit_cb">
      <form-header title='Update info' />
      <text-form-group v-model="email" label='Email' placeholder='Input your email address' type='email'/>
      <text-form-group v-model='username' name='n_username' label="New username" placeholder="Username e.g joesephnick" :validate='v_Username'/>
      <check-form-group v-model='changePass'  name='_pass' class='text-gray-500 hover:text-gray-600' label='Change password' />
      <text-form-group  :disabled='!changePass' v-model="old_pass" name='o_password' label='Old password' placeholder='Old password' type='password' />
      <text-form-group  :disabled='!changePass' v-model="new_pass" class="border-b border-gray-200" name='n_password' label='New password' placeholder='New password' type='password' :validate="p_Validate" />
      <check-form-group v-model='accepts' class='text-gray-500 hover:text-gray-600' label='Continue. This action can not be undone' />
      <button-form-group :spread='true' :labels='buttons' />
    </form-div>
  </backdrop>
</template>
<script>
  import FormDiv from '@/components/form-div.vue'
  import FormHeader from '@/components/form-header.vue'
  import backdrop from '@/components/backdrop.vue'
  import TextFormGroup from '@/components/text-form-group.vue'
  import ButtonFormGroup from '@/components/button-form-group.vue'
  import CheckFormGroup from '@/components/check-form-group.vue'

  import axios from 'axios'

  export default{
    components: { FormDiv, backdrop, FormHeader, ButtonFormGroup, TextFormGroup, CheckFormGroup },
    data(){
      return {
        showModal: true,

        old_pass: '',
        email: '',

        new_pass: '',
        username: '',

        accepts: false,
        changePass: true,

        buttons: [
          {
            label: "Delete user", 
            callback: this.onDelete, 
            type: "button"
          }, {
            label: "Update", 
            type: "submit"
          }
        ]
      }
    },
    methods : {
      closeModal(){
        this.showModal = false
        this.$router.back()
        this.showModal = true
      },
      submit_cb(){
        this.checkIfValid()
      },
      reset_cb(){
        this.new_pass = ''
        this.old_pass = ''
        this.new_email = ''
        this.username = ''
      },
      p_Validate(){
        let res = {
          sucess: false,
          message: ''
        }
        if((this.old_pass !== this.new_pass) && this.new_pass.length > 6){
          res.sucess = true
        }
        return res
      },
      v_Username(){
        let names = this.username.split(' ')
        let res = {
          sucess: true,
          info: ''
        }
        if(this.username.trim() == ''){
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
      checkIfValid(){
        axios
          .get(`${this.$root.serverHost}/api/users/owns?id=${this.$root.userData.userID}${this.changePass ? '&password='+this.old_pass : ''}&email=${this.email}`)
          .then((data)=>{
            if(data.data.sucess){
                this.updateUser()
            }else{
              this.email_error = "Email doesn't belong to this account"
              this.old_pass_error = "Incorrect email or password"
            }
          })
      },
      updateUser(){
        let data = {
          c_pass: this.changePass,
          c_username: this.username !== '',
          password: this.new_pass,
          email: this.username 
        }
        axios
          .put(`${this.$root.serverHost}/api/users/update?id=${this.$root.userData.userID}`, data)
          .then(data =>{
            if(data.data.sucess){
              this.$root.showAlert("Sucessfully updated your info. Log in to continue")
              this.$root.logOut()
              this.$router.back()
              this.$router.push('/sign-in')

            }
          })
      }
    }
  }
</script>