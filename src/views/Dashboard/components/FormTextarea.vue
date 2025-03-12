<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      :required="required"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  required: Boolean
})
defineEmits(['update:modelValue'])
</script>
