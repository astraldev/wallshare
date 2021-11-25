<template>
  <div class="text-form-group">
    <span>{{label}}</span>
    <input :type="toggleView ? 'text' : type" :name='name' :placeholder="placeholder" :class="error != '' && error ? errorClass : mainClass" :value="modelValue ? modelValue : val" @input="onInput" required="!!required" :disabled='!!disabled'/>
    <button :class="`absolute h-7 w-6 right-3 ${error || errMessage ? 'bottom-6' : 'bottom-2.5'}`" v-if="type == 'password'" type='button' @click="toggleView = !toggleView">
      <!-- Open Eyes -->
      <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" v-if='toggleView'>
        <path d="m8.1104 5.3164c-.051972-1.9e-6-.10422.010306-.15625.011719a2.6744 2.6744 0 01.046875-.00195 2.6744 2.6744 0 012.6738 2.6738 2.6744 2.6744 0 01-2.6738 2.6738 2.6744 2.6744 0 01-.09375-.0039c.067626.0024.1356.01367.20312.01367 2.2499-9.4e-5 4.4474-1.3421 6.6426-2.6836-2.1951-1.3415-4.3927-2.6835-6.6426-2.6836zm-.40625.029297c-2.1209.1468-4.2881 1.3926-6.457 2.6543 2.1629 1.2582 4.3242 2.4998 6.4395 2.6523a2.6744 2.6744 0 01-2.3594-2.6523 2.6744 2.6744 0 012.377-2.6543z" fill="#000004" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1px"/>
      </svg>
      <!-- Closed eyes -->
      <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" v-else>
        <rect transform="rotate(225)" x="-12.11" y="-6.4865" width="1.5918" height="12.973" ry=".79589" fill-rule="evenodd" stroke-width="1.1963"/>
        <path d="m8.1104 5.3164c-.051972-1.9e-6-.10422.010306-.15625.011719a2.6744 2.6744 0 01.046875-.00195 2.6744 2.6744 0 012.6738 2.6738 2.6744 2.6744 0 01-2.6738 2.6738 2.6744 2.6744 0 01-.09375-.0039c.067626.0024.1356.01367.20312.01367 2.2499-9.4e-5 4.4474-1.3421 6.6426-2.6836-2.1951-1.3415-4.3927-2.6835-6.6426-2.6836zm-.40625.029297c-2.1209.1468-4.2881 1.3926-6.457 2.6543 2.1629 1.2582 4.3242 2.4998 6.4395 2.6523a2.6744 2.6744 0 01-2.3594-2.6523 2.6744 2.6744 0 012.377-2.6543z" fill="#000004" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1px"/>
      </svg>
    </button>
    <span>{{error ? error : errMessage}}</span>
  </div>
</template>
<script>
 //@input="$emit('input', $event.target.value)" 
export default {
  props: ['label', 'name', 'type', 'placeholder', 'modelValue', 'error', 'validate', 'required', 'disabled'],
  data(){
    return {
      okayClass:  'border-blue-300 focus:bg-blue-50 focus:border-blue-400',
      errorClass: 'border-red-300 focus:bg-red-50 focus:border-red-400',
      mainClass:  'border-blue-300 focus:bg-blue-50 focus:border-blue-400',
      errMessage: "",
      val: '',
      toggleView: false
    }
  },
  watch:{
    error(val){
      if(!val){
        this.mainClass = this.errorClass
      }else{
        this.mainClass = this.okayClass
      }
    }
  },
  methods: {
    onInput(event){
      let value = event.target.value
      this.$emit('update:modelValue', value)
      this.$emit("change", value)
      this.val = value
      this.mainClass = this.okayClass
      if(typeof(this.validate) === 'function'){
        let res = this.validate(value)
        if(!res){return}
        if(res.sucess){
          this.mainClass = this.okayClass
          this.errMessage = ''
        } 
        else {
          this.mainClass = this.errorClass
          this.errMessage = res.info || res.message ||''
        }
        if(value === ''){
          this.mainClass = this.okayClass
          this.errMessage = ''
        }
      }
    }
  }
}
</script>