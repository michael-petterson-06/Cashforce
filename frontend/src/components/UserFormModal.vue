<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4 text-gray-800">
        {{ isEditMode ? 'Editar Usuário' : 'Cadastrar Usuário' }}
      </h2>
      <form @submit.prevent="$emit('submit', form)">
        <div class="grid gap-3">
          <input v-model="form.name" type="text" placeholder="Nome" class="input" maxlength="30" required />
          <input v-model="form.email" type="email" placeholder="E-mail" class="input" maxlength="30" required />
          <input v-model="form.phoneNumber" type="text" placeholder="Telefone" class="input" maxlength="15" />
          <input v-model="form.mobile" type="text" placeholder="Celular" class="input" maxlength="15" />
          <input v-model="form.departament" type="text" placeholder="Departamento" class="input" maxlength="20" />
        </div>

        <div class="flex justify-end gap-3 mt-5">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-brand-green text-white rounded-full text-sm hover:bg-emerald-700 transition"
          >
            Salvar
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
  watch: {
    initialData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        }
      }
    }
  },
};
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition;
}
</style>
