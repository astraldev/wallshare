<template> 
  <div class="check-form-group">
    <input :id="`check-${name}`" :name='name' :type="type ? type : 'checkbox' " :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
    <label :for="`check-${name}`"> {{label}} <router-link :to="link_to" v-if="!!router">{{link_label}}</router-link> <a v-else :href="link_to">{{link_label}}</a> </label>
  </div>
</template>
<script>
export default {
  props:['type', "label", 'link_label', 'modelValue', 'link_to', 'router', 'name']
}
</script>