<template>
    <div :class="sidebar ? ' grid form-div grid-rows-1 grid-cols-7' : 'flex form-div' ">
        <div :class="`diagonal-clip ${clip_color || ''} ${clip_class || ''}`" v-if="!!clip"></div>
        <div :class="`side-bar ${clip_color|| ''} ${side_class||''}`" v-else-if="!!sidebar">
            <slot name="side-bar"></slot>  
        </div>
        <form @submit.prevent="$emit('submit', $event)" :action='action' :method="method" @reset="$emit('reset', $event)" :class="form_class ? form_class : '' " >
            <slot></slot>
        </form>
    </div>
</template>
<script>
    export default {
        props: ['clip_class', 'clip_color', 'side_class', 'clip', 'sidebar', 'form_class', 'action', 'method'],
        emits: ['submit', 'reset']
    }
</script>