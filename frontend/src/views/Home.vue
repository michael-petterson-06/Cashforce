<template>
  <div class="flex h-screen bg-gray-50">

    <Sidebar />

    <main class="flex-1 p-8">
      <div class="flex items-center gap-2 mb-1">
        <img src="/Vector-2.svg" alt="Ícone Notas" class="w-5 h-5" />
        <h1 class="text-2xl font-bold text-gray-800">Notas fiscais</h1>
      </div>
      <p class="text-gray-500 mb-6">Visualize as notas fiscais que você tem.</p>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="grid grid-cols-6 px-6 py-3 bg-gray-100 text-xs font-bold text-gray-500 uppercase">
          <div>Nota Fiscal</div>
          <div>Sacado</div>
          <div>Cedente</div>
          <div>Emissão</div>
          <div>Valor</div>
          <div>Status</div>
        </div>
        <OrderRow
          v-for="(order, index) in orders"
          :key="index"
          :order="order"
        />
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/Sidebar.vue';
import OrderRow from '../components/OrderRow.vue';

export default {
  components: {
    Sidebar,
    OrderRow
  },
  data() {
    return {
      orders: []
    };
  },
  async mounted() {
    const { data } = await axios.get('http://localhost:3000/orders');
    this.orders = data;
  }
};
</script>
