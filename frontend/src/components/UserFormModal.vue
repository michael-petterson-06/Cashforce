<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm"
  >
    <div
      class="w-full max-w-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-6 animate-fade-in transition-colors"
    >
      <h2 class="text-xl font-bold mb-4">
        {{ isEditMode ? 'Editar Usuário' : 'Cadastrar Usuário' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nome</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Telefone</label>
            <input
              v-model="form.phoneNumber"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium mb-1">Celular</label>
            <input
              v-model="form.mobile"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Departamento</label>
          <input
            v-model="form.departament"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-emerald-700 transition"
          >
            {{ isEditMode ? 'Salvar' : 'Cadastrar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialData: Object,
    isEditMode: Boolean,
  },
  emits: ['close', 'submit'],
  data() {
    return {
      form: {
        name: '',
        email: '',
        phoneNumber: '',
        mobile: '',
        departament: '',
      },
    };
  },
  mounted() {
    if (this.initialData) {
      this.form = { ...this.initialData };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.form });
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
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
