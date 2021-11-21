<template>
  <div class="tag-input">
    <label for="search_inp">{{label}}</label>
    <div>
      <div class="flex justify-left items-center p-0 relative right-0 overflow-x-auto">
        <span v-for="(tag, ind) in tags" :class="`max-h-[0] flex items-center mr-1 lower justify-center bg-blue-400 text-white rounded p-1 ${animation[ind]}`" :key="ind">
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
      <input type="search" :ref='ref' id="search_inp" :class="` ${paint ? 'focus:bg-blue-50' : ''} h-9 p-1 flex w-full flex-shrink-0`" :value="val" :placeholder="placeholder" @keydown="onInput" @input="updateValue"/>
    </div>
    <span>{{error ? error : self_error }}</span>
  </div>
</template>
<script>
  export default {
    props: ['modelValue', 'placeholder', 'ref', 'label', 'error', 'max', 'accepts', 'paint'],
    emits: ['maxreached', 'removed', 'update:modelValue'],
    data(){
      return {
        tags: [],
        val: "",
        self_error: "",
        animation: []
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
        }, 300)
      },
      onInput(ev){
        let value = ev.target.value.trim()
        if(ev.code == 'Comma' || ev.code == 'Enter' || ev.code == 'Space'){
          ev.preventDefault()
          if(value.length > 0){
            if(this.tags.length >= this.max){
              this.onMaxReached(false)
            }else{
              //if()
              this.tags.push(value)
              this.animation.push('tag-view-open')
              ev.target.value = ''
              this.updateValue()
              this.onMaxReached(true)
            }
          }
        }else if(ev.code == 'Backspace'){
          if(value.length == 0 && this.tags.length > 0){
            this.removeTag(this.tags.length-1)
            this.onMaxReached(true)
          }
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
  @keyframes height-anim-in{
    from{max-height: 0; opacity: 0;}
    to{max-height: 2rem; opacity: 1;}
  }
  @keyframes height-anim-out{
    from{max-height: 2rem; opacity: 1;}
    to{max-height: 0; opacity: 0;}
  }
</style>