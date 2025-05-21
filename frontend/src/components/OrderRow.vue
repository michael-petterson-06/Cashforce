<template>
    <div class="grid grid-cols-6 px-6 py-4 items-center border-t">
      <div class="text-sm text-gray-700">{{ order.orderNfId }}</div>
      <div class="text-sm text-gray-700">{{ order.buyer?.name }}</div>
      <div class="text-sm text-gray-700">{{ order.provider?.name }}</div>
      <div class="text-sm text-gray-700">{{ formatDate(order.emissionDate) }}</div>
      <div class="text-sm font-medium text-brand-green">R$ {{ formatCurrency(order.value) }}</div>
      <div class="flex items-center gap-4">
        <span class="text-brand-green text-sm font-semibold whitespace-normal break-words text-left">
        {{ order.statusDescription }}
        </span>
        <button class="whitespace-nowrap px-4 py-1 border border-blue-200 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50">
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
        return Number(value).toFixed(2).replace('.', ',');
      },
      formatDate(date) {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      }
    }
  };
  </script>
  