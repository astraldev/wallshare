<template>
  <backdrop :show="showModal" @close="closeModal">
    <form-div :clip="true" @submit='onSubmit' @reset='onReset'>
      <form-header title="Add Photo" />
      <text-form-group label="Title" v-model='im_title' @change="onChange" placeholder="e.g Wildlife show" :error="onError" required/>
      <tag-input ref='tag_input' placeholder="Input tags seperated by comma or space" label="Tags" :max='10'  v-model='im_tags'/>
      <select-form-group label="Select licence" :options="['CCA']" v-model='im_license'/>
      <file-form-group label="File to upload" accepts="image/jpg,image/jpeg,image/png,image/svg" v-model='im_file' :multiple="false"/>
      <button-form-group :labels="buttons" />
    </form-div>
  </backdrop>
</template>
<script>
import backdrop from '@/components/backdrop.vue'
import TextFormGroup from '@/components/text-form-group.vue'
import SelectFormGroup from '@/components/select-form-group.vue'
import FormHeader from '@/components/form-header.vue'
import ButtonFormGroup from '@/components/button-form-group.vue'
import FileFormGroup from '@/components/file-form-group.vue'
import TagInput from '@/components/tag-input.vue'
import FormDiv from '@/components/form-div.vue'

import FormData from 'form-data'
import axios from 'axios'

export default {
    components: {backdrop, TextFormGroup, SelectFormGroup, FormDiv, FormHeader, ButtonFormGroup, FileFormGroup, TagInput},
    data(){
        return {
            showModal: true,
            im_title: '',
            im_tags: [],
            im_license: '',
            im_file: '',
            onError: "",
            buttons:[
              {
                label: 'Reset', 
                type: 'reset', 
                callback: this.onReset
              },
              {
                label: 'Upload file', 
                type: 'submit'
              }
            ]
        }
    }, 
    methods:{
        closeModal(){
            this.$router.back()
        },
        onSubmit(){
            var formData = new FormData()
            formData.append("photo", this.im_file)
            formData.append("tags", this.im_tags.join(" "))
            formData.append("license", this.im_license)
            formData.append('title', this.im_title)
            formData.append('userID',this.$root.userData.userID)
            axios({
                headers: {'Content-Type': 'multipart/form-data'},
                method: "post",
                url: `${this.$root.serverHost}/api/users/photo`,
                data: formData
            })
             .then((res)=>{
                if(res.data.sucess){
                    this.$router.back()
                    this.$root.refreshContent()
                    this.onReset()
                }else{
                    this.onError = res.data.info
                }
             })
             .catch((e)=>{console.log(e)})
        },
        onChange(){
            this.onError = ''
        },
        onReset(){
            this.im_file = ''
            this.im_title = ''
            this.im_license = ''
            this.im_tags = []
            this.$refs.tag_input.tags = []
        }
    }

}
</script>