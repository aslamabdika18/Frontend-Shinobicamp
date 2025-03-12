<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
      :required="required"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>
