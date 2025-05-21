<template>
  <div
    class="px-6 py-3 bg-white border border-[#DFE2EB] rounded-lg lg:grid lg:grid-cols-6 lg:items-center flex flex-col gap-2"
  >
  
    <div class="text-sm text-gray-700 flex lg:block gap-1">
      <span class="font-semibold text-gray-500 lg:hidden">Nota Fiscal:</span>
      {{ order.orderNfId }}
    </div>

  
    <div class="text-sm text-gray-700 flex lg:block gap-1">
      <span class="font-semibold text-gray-500 lg:hidden">Sacado:</span>
      {{ order.buyer.name }}
    </div>

  
    <div class="text-sm text-gray-700 flex lg:block gap-1">
      <span class="font-semibold text-gray-500 lg:hidden">Cedente:</span>
      {{ order.provider.name }}
    </div>

  
    <div class="text-sm text-gray-700 flex lg:block gap-1">
      <span class="font-semibold text-gray-500 lg:hidden">Emissão:</span>
      {{ formatDate(order.emissionDate) }}
    </div>

  
    <div class="text-sm font-semibold text-brand-green flex lg:block gap-1">
      <span class="font-semibold text-gray-500 lg:hidden">Valor:</span>
      R$ {{ formatCurrency(order.value) }}
    </div>

  
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
      <span class="text-sm font-semibold text-brand-green block text-start">
        {{ order.statusDescription }}
      </span>

      <button
        class="whitespace-nowrap px-4 py-2 border border-blue-200 rounded-full text-xs font-medium 	text-gray-700 hover:bg-blue-50"
      >
        Dados do cedente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  methods: {
    formatCurrency(value) {
      if (!value) return '0,00';
      return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
