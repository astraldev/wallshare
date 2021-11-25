<template>
    <div :class="`h-full w-full my-1 px-0.5 relative _photo-container ${category ? 'pr-1 border-2 border-gray-200 py-3' : ''}`">
        <span v-if='category' class="absolute -top-3 font-bold left-0 bg-white">{{category}}</span>
        <slot></slot>
    </div>
</template>
<script>
    export default{
        props: ['category'],
        data(){
            return {
                main: true
            }
        },
    }
</script>
<style scoped>
/*
._photo-container{
    line-height: 0;
    column-count: 0;
    column-gap: 0;
}
@media (min-width: 700px){
    ._photo-container{
        column-count: 2;
    }
}
@media (min-width: 1000px){
    ._photo-container{
        column-count: 2;
    }
}*/
._photo-container{
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))
}
</style>