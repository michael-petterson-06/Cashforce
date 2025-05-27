<template>
    <div
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-xl p-6 w-80 shadow-lg">
        <h2 class="text-lg font-bold mb-4 text-gray-800">More Actions</h2>
  
        <button
          class="w-full flex items-center gap-2 text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          @click="$emit('edit')"
        >
          <img src="/Pencil.svg" alt="Editar" class="w-4 h-4" />
          Editar
        </button>
  
        <button
          class="w-full flex items-center gap-2 text-left px-4 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-100 transition"
          @click="$emit('delete')"
        >
          <img src="/Trash.svg" alt="Deletar" class="w-4 h-4" />
          Deletar
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['close', 'edit', 'delete'],
  };
  </script>
  