<template>
    <div class="grid grid-cols-6 items-center px-6 py-3 bg-white border border-[#DFE2EB] rounded-lg">
      <div class="text-sm text-gray-700">{{ order.orderNfId }}</div>
      <div class="text-sm text-gray-700">{{ order.buyer.name }}</div>
      <div class="text-sm text-gray-700">{{ order.provider.name }}</div>
      <div class="text-sm text-gray-700">{{ formatDate(order.emissionDate) }}</div>

      <div class="text-sm font-semibold text-brand-green">R$ {{ formatCurrency(order.value) }}</div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold text-brand-green">
          {{ order.statusDescription }}
        </span>
        <button class="whitespace-nowrap px-4 py-2  border border-blue-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50">
          Dados do cedente
        </button>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      order: Object
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
        }
    }
  };
  </script>
  
  