<template>
  <div class="flex h-screen bg-white">

    <Sidebar class="hidden md:block" />

    <main class="flex-1 bg-white">

      <div class="pt-16">
        <div class="h-[1px] w-full" style="background-color: #DFE2EB;"></div>
      </div>


      <div class="px-4 md:px-16 pt-[40px]">
        <div class="flex items-center gap-2 mb-1">
          <img src="/Vector-2.svg" alt="Ícone Notas" class="w-5 h-5" />
          <h1 class="text-2xl font-bold text-gray-800">Notas fiscais</h1>
        </div>
        <p class="text-gray-500 mb-6">Visualize as notas fiscais que você tem.</p>
        <p class="text-red-500 text-sm mb-6 block md:hidden">
          Para melhor visualização, acesse em um computador.
        </p>

        <div class="bg-white shadow rounded-lg overflow-x-auto">
          <div class="hidden lg:grid grid-cols-6 px-6 py-3 text-xs font-bold uppercase" style="color: #A1A8B8;">
            <div>Nota Fiscal</div>
            <div>Sacado</div>
            <div>Cedente</div>
            <div>Emissão</div>
            <div>Valor</div>
            <div>Status</div>
          </div>
          <div class="space-y-3 mt-4">
            <OrderRow
              v-for="(order, index) in orders"
              :key="index"
              :order="order"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import OrderRow from '../components/OrderRow.vue';
import { getOrders } from '../services/orderService';

export default {
  components: { Sidebar, OrderRow },
  data() {
    return { orders: [] };
  },
  async mounted() {
    this.orders = await getOrders();
  },
};
</script>