<template>
  <div
    :class="[
      'px-6 py-3 bg-white border border-[#DFE2EB] rounded-lg',
      'lg:grid flex flex-col gap-2',
      showActions ? 'lg:grid-cols-7' : 'lg:grid-cols-6'
    ]"
  >
    
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="text-sm text-gray-700 flex lg:items-center lg:truncate gap-1"
    >
      <span class="font-semibold text-gray-500 lg:hidden">{{ field.label }}:</span>
      <span :class="field.class || ''">
        {{ field.format ? field.format(field.value) : field.value }}
      </span>
    </div>

    
    <div v-if="showActions" class="flex items-center justify-start">
    
      <button
        class="text-2xl font-bold text-brand-green hover:opacity-80 transition"
        title="Mais opções"
        @click="$emit('openMenu', fields)"
      >
        ⋯
      </button>
    </div>


    <div
      class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2"
      v-if="actions && !showActions"
    >
      <span class="text-sm text-brand-green block text-start">
        {{ actions.status }}
      </span>
      <button
        class="whitespace-nowrap px-4 py-2 border border-blue-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50"
        @click="actions.onClick"
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
    showActions: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
