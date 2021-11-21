<template>
  <div :class="`button-form-group-multiple ${spread ? 'spread' : '' }`" v-if="!!labels">
    <button v-for="(lab, index) in labels" :type="lab.type ? lab.type : 'button'" :style="`border-color: ${lab.border}; background: ${lab.bg}`" :key="index" @click="lab.callback">
      {{lab.label}}
    </button>
  </div>
  <div class="button-form-group " v-else>
    <button @click="callback" :type='type'>
      {{label}}
    </button>
  </div>
</template>
<script> 
export default{
  props: {
    labels: {
      default: ()=>{[]}, 
      type: Object
    },
    label:{
      default: "Button",
      type: String
    },
    callback: {
      default: ()=>{},
      type: Function
    },
    type:{
      default: "button"
    },
    spread: {
      default: false
    }
  }
}
</script>