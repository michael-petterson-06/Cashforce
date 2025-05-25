
<template>
  <div
    class="px-6 py-3 bg-white border border-[#DFE2EB] rounded-lg lg:grid lg:grid-cols-6 lg:items-center flex flex-col gap-2"
  >
   
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="text-sm text-gray-700 flex lg:block gap-1"
      :class="field.class || ''"
    >
      <span class="font-semibold text-gray-500 lg:hidden">{{ field.label }}:</span>
      {{ field.format ? field.format(field.value) : field.value }}
    </div>

    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2"
      v-if="actions"
    >
      <span class="text-sm font-semibold text-brand-green block text-start">
        {{ actions.status }}
      </span>
      <button
        class="whitespace-nowrap px-4 py-2 border border-blue-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50"
      >
        {{ actions.buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fields: Array,
    actions: Object,
  },
};
</script>
