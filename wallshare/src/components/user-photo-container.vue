<template>
    <div class="w-full sticky top-1 z-30 overflow-y-auto h-screen">
        <ul class="w-full sticky h-[9.5vh] top-0 flex items-center z-40 bg-white shadow-md ring-white">
            <li  :class="`w-full flex h-full text-base p-1 ${main ? 'border-b-4 border-green-500 font-bold bg-blue-100' : 'hover:bg-blue-50'}`">
                <button class="w-full h-full flex items-center p-2 justify-center" @click="main = true">Personal</button>
            </li>
            <li :class="`w-full flex p-1 h-full text-base ${!main ? 'border-b-4 border-green-500 font-bold bg-blue-100' : 'hover:bg-blue-50'}`">
                <button class="w-full h-full flex items-center p-2 justify-center" @click="main = false">Liked</button>
            </li>
        </ul>
        <main :hidden="!main" class="w-full">
            <slot>
                <div class="text-base text-center w-4/5 mx-auto p-2 text-gray-800">
                    No photos availiable. <br /> 
                    <router-link class='text-blue-400 underline text-decoration-dotted' :to="link  || '/' ">Add one.</router-link>
                </div>
            </slot>
        </main>
        <main :hidden="main" class="w-full">
            <slot name="liked">
                <div class="text-base text-center p-2 w-4/5 mx-auto text-gray-800">
                    You have not liked any photo. <br />
                    All liked <router-link to="/" class='text-blue-400 underline text-decoration-dotted'>photos</router-link> will appear here.
                </div>
            </slot>
        </main>
    </div>
</template>
<script>
export default{
    props: ['link'],
    data(){
        return {main: true}
    }
}
</script>