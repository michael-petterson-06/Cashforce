<template>
  <div class="flex h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
    <Sidebar class="hidden md:block" />

    <main class="flex-1 bg-white dark:bg-gray-900 p-6 md:px-16 pt-[40px] transition-colors">
      <div class="block md:hidden mb-4">
        <img src="/Logo.svg" alt="Cashforce Logo" class="h-6" />
      </div>

      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Dados do Cedente</h1>
          <p class="text-gray-500 dark:text-gray-300">Informações completas do cedente vinculado à nota fiscal.</p>
        </div>
        <button
          @click="$router.push('/')"
          class="px-4 py-2 bg-brand-green text-white rounded-full hover:bg-emerald-700 transition text-sm"
        >
          Voltar
        </button>
      </div>

      <div
        v-if="cedente"
        class="bg-white dark:bg-gray-800 shadow rounded-lg border border-[#DFE2EB] dark:border-gray-700 p-6 space-y-2 text-sm text-gray-700 dark:text-gray-100 animate-fade-in transition-colors"
      >
        <div><strong>ID:</strong> {{ cedente.id }}</div>
        <div><strong>Nome:</strong> {{ cedente.name || '-' }}</div>
        <div><strong>Razão Social:</strong> {{ cedente.tradingName || '-' }}</div>
        <div><strong>Telefone:</strong> {{ cedente.phoneNumber || '-' }}</div>
        <div><strong>Email:</strong> {{ cedente.email || '-' }}</div>
        <div><strong>Cashforce Tax:</strong> {{ cedente.cashforceTax || '-' }}</div>
        <div><strong>Responsável:</strong> {{ cedente.responsibleName || '-' }}</div>
        <div><strong>Email do Responsável:</strong> {{ cedente.responsibleEmail || '-' }}</div>
        <div><strong>Cargo do Responsável:</strong> {{ cedente.responsiblePosition || '-' }}</div>
        <div><strong>Telefone do Responsável:</strong> {{ cedente.responsiblePhone || '-' }}</div>
        <div><strong>Celular do Responsável:</strong> {{ cedente.responsibleMobile || '-' }}</div>
        <div><strong>Website:</strong> {{ cedente.website || '-' }}</div>
        <div><strong>Endereço:</strong> {{ cedente.address || '-' }}, Nº {{ cedente.number || '-' }}</div>
        <div><strong>Complemento:</strong> {{ cedente.complement || '-' }}</div>
        <div><strong>Bairro:</strong> {{ cedente.neighborhood || '-' }}</div>
        <div><strong>Cidade/UF:</strong> {{ cedente.city || '-' }}/{{ cedente.state || '-' }}</div>
        <div><strong>CEP:</strong> {{ cedente.postalCode || '-' }}</div>
        <div><strong>Banco:</strong> {{ cedente.bank || '-' }}</div>
        <div><strong>Agência:</strong> {{ cedente.bankAgency || '-' }}</div>
        <div><strong>Conta:</strong> {{ cedente.account || '-' }}</div>
        <div><strong>Documentos:</strong> {{ cedente.documents || '-' }}</div>
        <div><strong>Situação:</strong> {{ cedente.situation || '-' }}</div>
        <div><strong>Data da Situação:</strong> {{ cedente.situationDate || '-' }}</div>
        <div><strong>CNPJ ID:</strong> {{ cedente.cnpjId || '-' }}</div>
      </div>

      <LoadingSpinner v-else />
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { getOrderById } from '../services/orderService';

export default {
  components: { Sidebar, LoadingSpinner },
  data() {
    return {
      cedente: null,
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    try {
      const pedido = await getOrderById(id);
      this.cedente = pedido.provider;
    } catch (error) {
      console.error('Erro ao carregar dados do cedente:', error);
    }
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}
</style>
