<template>
    <backdrop :show='show' @close="$emit('cancel')">
        <div :class="`rounded-lg p-3 w-5/6 md:2/3 lg:1/3 shadow-lg bg-white ${show ? 'animate-alert' : ''}`">
            <!-- Content -->
            <div class="flex flex-col divide-y-2">
                <div class="text-lg font-bold text-gray-800">{{title}}</div>
                <div class="text-gray-700 p-2">{{body}}</div>
            </div>
            <div class="flex items-center">
                <div class="flex items-center p-2 text-gray-600 hover:text-gray-800 " v-if="id">
                    <input type="checkbox" id="__check" @change="onChange">
                    <label for="__check" class="text-base">Don't show again</label>
                </div>  
                <button @click="$emit('cancel')" class="text-center text-white ml-auto bg-red-400 hover:ring-red-300 hover:ring-2 py-1.5 w-1/5 px-2 rounded-md">{{declineLabel ? declineLabel : 'Cancel'}}</button>
                <button @click="$emit('accept')" class="text-center text-white ml-3  bg-blue-400 hover:ring-blue-300 hover:ring-2 py-1.5 w-1/5 px-2 rounded-md">{{acceptLabel ? acceptLabel : 'Okay'}}</button>
            </div>
        </div>
    </backdrop>
</template>
<script>
    import backdrop from './backdrop.vue'
    export default {
        props: ['body', 'title', 'show', 'acceptLabel', 'declineLabel', 'id'],
        components: { backdrop },
        emits: ['accept', 'cancel'],
        methods: {
            onChange(){
                if(this.id){
                    this.$cookies.set(`showAlert_${this.id}`, 0, {expires: '1M'})
                }
            }
        }
    }
</script>
<style scoped>
    .animate-alert{
        animation: animate 400ms 0s ease-out;
    }
    @keyframes animate{
        0%{
            transform: scale(1.15);
        }25%{
            transform: scale(0.9);
        }50%{
            transform: scale(1.1);
        }75%{
            transform: scale(0.95);
        }100%{
            transform: scale(1.0);
        }
    }
</style>