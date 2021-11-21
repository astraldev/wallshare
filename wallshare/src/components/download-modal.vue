<template>
    <backdrop :show='showDownload'> 
        <div class="flex bg-white flex-col w-11/12 rounded-lg border border-gray-100 shadow-lg pt-2 m-auto">
            <div class="text-gray-600 text-2xl p-3 pb-1 font-bold text-center ">
                Download is starting {{seconds != 0 ? `in ${seconds}s` : 'now'}}
            </div>
            <div class="mx-2 p-1">
                <div class="p-1 mx-1 text-base leading-tight text-gray-600 text-left"> By downloading this image you accept the terms and conditions of this site. </div>
                <div class="text-gray-700 font-bold mx-1.5 ">Attribute user</div>
            <div class="flex items-center justify-between mx-1">
                <button class="p-1.5 border rounded-md text-white w-full ml-0.5 bg-blue-400 hover:ring-blue-300 hover:ring-1"> Embed <span class="font-bold">&lt;/&gt;</span></button>
                <button class="p-1.5 border rounded-md text-white w-full mx-0.5 bg-green-400 hover:ring-green-300 hover:ring-1"> Donate </button>
                <button class="p-1.5 border rounded-md text-white w-full mr-0.5 bg-indigo-400 hover:ring-indigo-300 hover:ring-1"> Cite </button>
            </div>
            </div>
        </div>
    </backdrop>
</template>
<script>
    import backdrop from '@/components/backdrop.vue'

    export default {
        props: ['showDownload', 'start'],
        emits: ['close'],
        components: { backdrop },
        watch: {
            start(val){
                if(val){
                    this.seconds = 5
                    this.interval = setInterval(this.countdown, 1000)
                }
            }
        },
        data(){
            return {
                seconds: 5
            }
        },
        methods:{
            countdown(){
                this.seconds -= 1
                if(this.seconds == 0){
                    clearInterval(this.interval)
                    this.$emit('close')
                }
            }
        }
    }
</script>