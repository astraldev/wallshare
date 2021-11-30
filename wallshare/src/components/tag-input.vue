<template>
  <div :class="`tag-input ${noPad ? '' : 'p-1.5 md:p-3'}`">
    <label for="search_inp" v-if="label">{{label}}</label>
    <div :class="`${reverse ? 'flex-col-reverse' : 'flex-col'} ${!label ? 'w-full': ''}`">
      <div :class="`flex justify-left items-center w-full ${tags.length > 0 ? '' : 'hidden'} p-0 ${float ? 'absolute top-[99%] left-0 bg-white w-full md:z-50 right-0 border-2 border-blue-400 rounded-md flex-wrap ' : 'relative right-0 overflow-x-auto bg-white border-b border-gray-100 pb-0.5'}`">
        <span v-for="(tag, ind) in tags" :class="`max-h-[0] shadow-md flex items-center mr-1 ${float ? 'm-0.5' : ''} lower justify-center bg-blue-400 text-white rounded p-1 ${animation[ind]}`" :key="ind">
          {{tag}}
          <button type="button" class="h-4 w-4 p-0.5 relative ml-1 text-gray-100 hover:text-white" @click="removeTag(ind)">
            <svg version="1.1" viewBox="0 0 16 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
              <g fill-rule="evenodd" stroke-width="1.1">
                <path transform="rotate(135)" d="m-6.6128-12.428h13.226c.6173 0 1.1143.49696 1.1143 1.1143s-.49696 1.1143-1.1143 1.1143h-13.226c-.6173 0-1.1143-.49696-1.1143-1.1143s.49696-1.1143 1.1143-1.1143z"/>
                <path d="m4.1119 2.5361c3.1415 3.1469 6.2941 6.2833 9.4287 9.4368.54074.60447.14825 1.6782-.65204 1.7979-.56324.14044-1.0002-.27674-1.3479-.65438-3.0257-3.0311-6.0624-6.0517-9.0812-9.0893-.54075-.60447-.14825-1.6782.65204-1.7979.35768-.072213.74479.046452 1.0005.30691z"/>
              </g>
            </svg>
          </button>
        </span>
      </div>
      <input type="search" :ref='ref' id="search_inp" :class="`h-9 ${!noPaint ? 'focus:bg-blue-50' : ''} p-1 flex w-full text-gray-600 flex-shrink-0`" :value="val" :placeholder="placeholder" @keydown="onInput"/>
    </div>
    <span>{{error ? error : self_error }}</span>
  </div>
</template>
<script>
  export default {
    props: ['modelValue', 'placeholder', 'ref', 'label', 'error', 'float', 'max', 'accepts', 'no-paint', 'no-pad', 'reverse'],
    emits: ['maxreached', 'removed', 'update:modelValue'],
    data(){
      return {
        tags: [],
        val: "",
        self_error: "",
        animation: []
      }
    },
    mounted(){
      if(typeof(this.modelValue) === typeof(['tag'])){
        for(let i = 0; i < this.modelValue.length; i++){
          this.tags.push(this.modelValue[i])
          this.animation.push('tag-view-open')
        }
      }
    },
    methods: {
      onMaxReached(clear){
        if(!clear)
          this.self_error = "Max number of tags reached"
        else
          this.self_error = ''
      },
      getSearch(){
        return this.search.slice(1, this.search.length)
      },
      removeTag(ind){
        this.animation[ind] = 'tag-view-close'
        setTimeout(()=>{
          this.tags.splice(ind, 1)
          this.onMaxReached(true)
          this.animation.splice(ind,1)
          this.$emit("removed", ind)
        }, 250)
      },
      onInput(ev){
        let key = ev.key,
            value = ev.target.value.trim();
        
        if(key == "," || key == " "){
          ev.preventDefault();
          if(value.length > 0){
            if(this.tags.length >= this.max){
              this.onMaxReached(false)
              return
            }else{
              this.tags.push(value)
              let index = this.animation.push('tag-view-open')
              setTimeout(()=>{
                this.animation[index-1] = 'tag-end'
              }, 310)
              this.val = ''
              this.updateValue()
              this.onMaxReached(true)
            }
          }
        }else if(key === 'Backspace'){
          if(value.length == 0 && this.tags.length > 0){
            this.removeTag(this.tags.length-1)
            this.onMaxReached(true)
          }
        }else{
          this.updateValue()
        }
      },
      updateValue(){
        this.$emit('update:modelValue', this.tags)
      }
    }
  }
</script>
<style>
  .tag-view-open{
    animation: height-anim-in 300ms 0s ease forwards;
  }
  .tag-view-close{
    animation: height-anim-out 300ms 0s ease backwards;
  }
  .tag-end {
    max-height: 2rem;
  }
  @keyframes height-anim-in{
    from{max-height: 0; opacity: 0;}
    to{max-height: 2rem; opacity: 1;}
  }
  @keyframes height-anim-out{
    from{max-height: 2rem; opacity: 1;}
    to{max-height: 0; opacity: 0;}
  }
  .transition-width{
    transition: width 400ms 0 ease;
  }
</style>