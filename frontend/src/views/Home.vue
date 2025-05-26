<template>
  <div class="flex h-screen bg-white">
    <Sidebar class="hidden md:block" />
    <main class="flex-1 bg-white">
      <div class="block md:hidden px-6 pt-6">
        <img src="/Logo.svg" alt="Cashforce Logo" class="h-6 mb-4" />
      </div>
      <div class="pt-16">
        <div class="h-[1px] w-full" style="background-color: #DFE2EB;"></div>
      </div>

      <div class="px-4 md:px-16 pt-[40px]">
        <div class="flex items-center gap-2 mb-1">
          <img src="/Vector-2.svg" alt="Ícone" class="w-5 h-5" />
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isUserRoute ? 'Usuários' : 'Notas fiscais' }}
          </h1>
        </div>

        <p class="text-gray-500 mb-6">
          {{ isUserRoute ? 'Visualize os usuários cadastrados.' : 'Visualize as notas fiscais que você tem.' }}
        </p>

        <div class="bg-white shadow rounded-lg overflow-x-auto">
          <div
          class="hidden lg:grid grid-cols-6 px-6 py-3 text-xs font-bold uppercase"
          style="color: #A1A8B8;"
        >
          <div v-for="(header, i) in tableHeaders" :key="i">{{ header }}</div>
        </div>


        <div class="space-y-3 mt-4" v-if="!loading">
          <BaseRow
            v-for="(item, index) in items"
            :key="index"
            :fields="mapFields(item)"
            :actions="getActions(item)"
          />
        </div>
        
        <LoadingSpinner v-else />

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import BaseRow from '../components/BaseRow.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { getOrders } from '../services/orderService';
import { getUsers } from '../services/userService';

export default {
  components: { Sidebar, BaseRow, LoadingSpinner },
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  computed: {
    isUserRoute() {
      return this.$route.name === 'Users';
    },
    tableHeaders() {
      return this.isUserRoute
        ? ['Nota ID', 'Nome', 'Email', 'Telefone', 'Celular', 'Departamento']
        : ['Nota Fiscal', 'Sacado', 'Cedente', 'Emissão', 'Valor', 'Status'];
    },
  },
  async mounted() {
    await this.loadData();
  },
  watch: {
    $route: {
      immediate: false,
      handler() {
        this.loadData();
      },
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      this.items = this.isUserRoute ? await getUsers() : await getOrders();
      this.loading = false;
    },
    formatCurrency(value) {
      return `R$ ${Number(value || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    formatDate(date) {
      const d = new Date(date);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    },
    mapFields(item) {
      if (this.isUserRoute) {
        return [
          { label: 'ID', value: item.id },
          { label: 'Nome', value: item.name },
          { label: 'Email', value: item.email || '-', class: 'text-brand-green'  },
          { label: 'Telefone', value: item.phoneNumber || '-' },
          { label: 'Celular', value: item.mobile || '-' },
          { label: 'Departamento', value: item.departament || '-' },
        ];
      }
      return [
        { label: 'Nota Fiscal', value: item.orderNfId },
        { label: 'Sacado', value: item.buyer?.name },
        { label: 'Cedente', value: item.provider?.name },
        { label: 'Emissão', value: item.emissionDate, format: this.formatDate },
        { label: 'Valor', value: item.value, format: this.formatCurrency, class: 'text-brand-green' },
        // { label: 'Status', value: item.statusDescription },
      ];
    },
    getActions(item) {
      if (!this.isUserRoute) {
        return {
          status: item.statusDescription,
          buttonLabel: 'Dados do cedente',
          onClick: () => this.$router.push(`/cedente/${item.id}`)
        };
      }
    },
  },
};

</script>
