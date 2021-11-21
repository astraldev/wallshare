<template>
    <backdrop :show='showModal' @close='closeModal'>
        <form-div :clip='true'>
            <form-header title='Update info' />
            <text-form-group name='old_email' label='Old Email' placeholder='e.g joenick@gmail.com' type='email'/>
            <text-form-group name='email' label='New Email' placeholder='New email' type='email'/>
            <text-form-group name='old_password' label='Old password' placeholder='Old password' type='password' />
            <text-form-group name='password' label='New password' placeholder='New password' type='password' />
            <check-form-group class='text-gray-500' label='Continue. This action can not be undone' />
            <button-form-group :spread='true' :labels='[{label: "Delete user"}, {label: "Update"}]' />
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

export default{
    components: { FormDiv, backdrop, FormHeader, ButtonFormGroup, TextFormGroup, CheckFormGroup },
    data(){
        return {
            showModal: true
        }
    },
    methods : {
        closeModal(){
            this.showModal = false
            this.$router.back()
            this.showModal = true
        }
    }
}
</script>