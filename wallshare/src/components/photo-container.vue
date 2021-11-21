<template>
    <div :class="`h-full w-full my-1 px-0.5 relative ${category ? 'pr-1 border-2 border-gray-200 py-3' : ''}`">
        <span v-if='category' class="absolute -top-3 font-bold left-0 bg-white">{{category}}</span>
        <slot></slot>
    </div>
</template>
<script>
    export default{
        props: ['category'],
        data(){
            return {main: true}
        },
    }
</script>
<style scoped>

</style>