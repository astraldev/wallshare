<template>
  <div class="backdrop-filter fixed bg-gray-500/[0.9] border-0 backdrop-blur-md z-[100] inset-0" :style="`background-image: ${image}`" v-if="show">
    <button class="h-7 w-7 p-0.5 absolute z-20 top-2 right-2 text-gray-200 hover:text-white" @click="$emit('close')">
      <svg version="1.1" viewBox="0 0 16 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
        <g fill-rule="evenodd" stroke-width="1.1">
          <path transform="rotate(135)" d="m-6.6128-12.428h13.226c.6173 0 1.1143.49696 1.1143 1.1143s-.49696 1.1143-1.1143 1.1143h-13.226c-.6173 0-1.1143-.49696-1.1143-1.1143s.49696-1.1143 1.1143-1.1143z"/>
          <path d="m4.1119 2.5361c3.1415 3.1469 6.2941 6.2833 9.4287 9.4368.54074.60447.14825 1.6782-.65204 1.7979-.56324.14044-1.0002-.27674-1.3479-.65438-3.0257-3.0311-6.0624-6.0517-9.0812-9.0893-.54075-.60447-.14825-1.6782.65204-1.7979.35768-.072213.74479.046452 1.0005.30691z"/>
        </g>
      </svg>
    </button>
    <div class="relative flex items-center justify-center w-full h-full"> 
      <slot></slot> 
    </div>
  </div>
</template>
<script>
export default {
  name: "backdrop",
  props: ['image', 'show'],
  emits: ["close"]
}
</script>
