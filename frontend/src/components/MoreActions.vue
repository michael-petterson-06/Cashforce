<template>
  <div
    class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-4 w-64 animate-fade-in transition-colors">
      <h3 class="text-md font-bold mb-4">Ações</h3>
      <div class="space-y-2">
        <button
          class="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
          @click="$emit('edit')"
        >
        ✏️  Editar
        </button>
        <button
          class="w-full text-left px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 transition flex items-center gap-2"
          @click="$emit('delete')"
        >
        🗑️
          Apagar
        </button>
        <button
          class="w-full text-left px-4 py-2 text-sm rounded-md text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          @click="$emit('close')"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
