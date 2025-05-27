<template>
    <div
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      @click.self="$emit('cancel')"
    >
      <div class="bg-white border border-brand-green p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
        <div class="flex justify-center mb-3">
          <img src="/Trash.svg" alt="Apagar" class="w-6 h-6" />
        </div>
        <h2 class="text-lg font-semibold text-brand-green mb-2">{{ title }}</h2>
        <p class="text-gray-600 text-sm mb-4">
          Tem certeza que deseja apagar {{ targetLabel }}?
        </p>
        <div class="flex justify-center gap-4 pt-2">
          <button
            class="px-4 py-2 bg-brand-green text-white rounded-full text-sm hover:bg-green-700 transition"
            @click="$emit('confirm')"
          >
            Apagar
          </button>
          <button
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
            @click="$emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      targetLabel: String,
    },
    emits: ['confirm', 'cancel'],
  };
  </script>
  