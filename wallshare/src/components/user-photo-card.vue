<template>
    <div class="w-full mb-1 animate-user-photo-card opacity-0 relative object-contain border border-gray-100 hover:border-gray-200 shadow-md rounded overflow-hidden">
        <button @click="$emit('delete', photo)" class="backdrop-filter bg-gray-100/30 backdrop-blur-sm w-6 h-6 p-0.5 hover:text-gray-100 top-1 right-1 absolute text-gray-300">
            <svg version="1.1" viewBox="0 0 16 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
              <g fill-rule="evenodd" stroke-width="1.1">
                <path transform="rotate(135)" d="m-6.6128-12.428h13.226c.6173 0 1.1143.49696 1.1143 1.1143s-.49696 1.1143-1.1143 1.1143h-13.226c-.6173 0-1.1143-.49696-1.1143-1.1143s.49696-1.1143 1.1143-1.1143z"/>
                <path d="m4.1119 2.5361c3.1415 3.1469 6.2941 6.2833 9.4287 9.4368.54074.60447.14825 1.6782-.65204 1.7979-.56324.14044-1.0002-.27674-1.3479-.65438-3.0257-3.0311-6.0624-6.0517-9.0812-9.0893-.54075-.60447-.14825-1.6782.65204-1.7979.35768-.072213.74479.046452 1.0005.30691z"/>
              </g>
            </svg>
        </button>
        <img :src="photo.link" class="w-auto object-contain h-auto">
        <div class="relative py-3 px-2">
            <button @click='$emit("edit", photo)' class="absolute right-0 -top-9 rounded-tl-lg backdrop-filter backdrop-blur-md border-2 border-blue-400 py-0.5 px-1.5 grid grid-cols-2 items-center text-white backdrop-filter bg-blue-500/70 opacity-40 hover:opacity-[100] hover:bg-opacity-[100]" >
                <svg version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="stroke-current">
                    <path d="m3.2222 10.222c-.1585.58208-.31744 1.1658-.0008644 1.3923.31657.22654 1.1082.09569 1.6145.23082.50633.13514.72748.53536.9496.93735m5.7751-10.39c-.08202.0001911-.34564.0008051-.42805.0009971-.08241.0001919-.22328.14106-.22328.14106l-.0014-.00138s-7.6815 7.6815-7.6815 7.6815l-.00138-.0014s-.00138.0041-.00138.0041-.00276.0028-.00276.0028l.00138.0014-.47647 1.7498-.44885 1.6449-.031764.11187.10496-.02762 1.6545-.4447s1.7581-.47371 1.7581-.47371h.00276s7.5448-7.5448 7.5448-7.5448l.14087-.14087s.14087-.14087.14087-.22308v-.42943c0-.082215-1.9694-2.0516-2.0514-2.0514z" fill="none" stroke-linejoin="round" stroke-width=".7"/>
                </svg> 
                <span>Edit</span>
            </button>
            <div class="w-full flex space-x-2 flex-wrap text-gray-600 my-1"><span class="font-bold inline-flex items-center text-base text-gray-700 text-left pr-2">Name :</span> {{photo.name}}</div>
            <div class="w-full flex space-x-2 flex-wrap text-gray-600 my-1"><span class="font-bold inline-flex items-center text-base text-gray-700 text-left pr-2">Created:</span> {{photo.created}}</div>
            <div class="w-full flex space-x-2 flex-wrap text-gray-600 my-1"><span class="font-bold inline-flex items-center text-base text-gray-700 text-left pr-2">License:</span> {{photo.license}}</div>
            <div class="w-full flex space-x-2 flex-wrap text-gray-600 my-1"><span class="font-bold inline-flex items-center text-base text-gray-700 text-left pr-2">Downloads:</span> {{photo.downloads}}</div>
            <div class="w-full flex space-x-2 flex-wrap text-gray-600 my-1"><span class="font-bold inline-flex items-center text-base text-gray-700 text-left pr-2">Tags:</span>
                <span v-for='(tag, index) in photo.tags' :key='index' class='capitalize cursor-pointer text-base text-blue-600 underline text-decoration-dotted'>{{tag}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['photo'],
        emits: ['delete', 'edit'],
        data(){return { observer: null } },
        mounted(){
            this.observer = new IntersectionObserver((entries) =>{
              entries.forEach((el)=>{
                this.fadeInAnimation(el.target, el.isIntersecting)
              })
            });
            this.observer.observe(this.$el);
        },
        methods:{
            fadeInAnimation(el, isIntersecting){
                if(isIntersecting){
                    el.classList.add('fade-in')
                }else{
                    el.classList.remove('fade-in')
                }
            }
        }
    }
</script>