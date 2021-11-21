<template>
    <div class="select-form-group">
        <label for="__select">{{label}}</label>
        <select id="__select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option disabled hidden></option>
            <option v-for="(option, ind) in options" :value="option" :key="ind">{{option}}</option>
        </select>
    </div>
</template>
<script>
export default {
    props: ['options', 'label', 'modelValue']
}
</script>