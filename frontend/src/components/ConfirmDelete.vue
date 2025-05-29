<template>
  <div class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
    <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-6 w-full max-w-sm animate-fade-in transition-colors">
      <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Tem certeza que deseja apagar {{ targetLabel }}? Essa ação não poderá ser desfeita.
      </p>
      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition"
          @click="$emit('confirm')"
        >
          Apagar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Confirmar exclusão',
    },
    targetLabel: {
      type: String,
      default: 'este item',
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
