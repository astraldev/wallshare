<template>
  <!-- This is a message template -->
  <div :class="`fixed w-full flex flex-col-reverse bottom-0 ${show ? 'slide-up' : hide_animation }`">
  <div class="items-center w-[fit-content] mx-auto flex mb-0 rounded border bg-white shadow-lg px-2 py-1.5">
    <div class='flex flex-col mx-auto'>
      <span>{{title}}</span>
      <slot class="p-2"></slot>
    </div>
    <button class="h-5 w-5 p-0.5 ml-auto" @click="atClick" v-if='!customButton'>
      <svg version="1.1" viewBox="0 0 16 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
        <g fill-rule="evenodd" stroke-width="1.1">
          <path transform="rotate(135)" d="m-6.6128-12.428h13.226c.6173 0 1.1143.49696 1.1143 1.1143s-.49696 1.1143-1.1143 1.1143h-13.226c-.6173 0-1.1143-.49696-1.1143-1.1143s.49696-1.1143 1.1143-1.1143z"/>
          <path d="m4.1119 2.5361c3.1415 3.1469 6.2941 6.2833 9.4287 9.4368.54074.60447.14825 1.6782-.65204 1.7979-.56324.14044-1.0002-.27674-1.3479-.65438-3.0257-3.0311-6.0624-6.0517-9.0812-9.0893-.54075-.60447-.14825-1.6782.65204-1.7979.35768-.072213.74479.046452 1.0005.30691z"/>
        </g>
      </svg>
    </button>
  </div>
  </div>
</template>
<script>
  export default {
    props: ['title', 'customButton', 'onClose', 'show'],
    data(){
      return {
        hide_animation: '',
      }
    },
    mounted(){
      if(!this.show){
        this.hide_animation = 'hidden'
      }
    },
    watch : {
      show(){
        if(!this.show){
          this.hide_animation = 'slide-down'
        }
      }
    },
    methods : {
      atClick(){
        if(typeof(this.onClose) == 'function'){
          this.onClose()
        }
      }
    }
  }
</script>
<style scoped>
.slide-up{
  animation: slide-up 450ms 0s forwards;
}
.slide-down{
  animation: slide-down 450ms 0s forwards;
}
@keyframes slide-up{
  from{
    opacity: 0;
    transform: translateY(100px);
  }to{
    opacity: 1;
    transform: translateY(0px);
  }
}@keyframes slide-down{
  from{
    opacity: 1;
    transform: translateY(0px);
  }to{
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>