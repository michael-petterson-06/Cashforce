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

      <div class="px-4 md:px-16 pt-[42px]">
        <div class="flex items-center gap-2 mb-1">
          <img src="/Vector-2.svg" alt="Ícone" class="w-5 h-5" />
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isUserRoute ? 'Usuários' : 'Notas fiscais' }}
          </h1>
        </div>

         <div class="bg-white shadow rounded-lg overflow-x-auto">
          <div
            class="hidden lg:grid px-6 py-3 text-xs font-bold uppercase"
            :class="isUserRoute ? 'grid-cols-7' : 'grid-cols-6'"
            style="color: #A1A8B8;"
          >
            <div v-for="(header, i) in tableHeaders" :key="i">{{ header }}</div>
            <div v-if="isUserRoute" class="flex items-center justify-between -mt-[8px]">
              <span>Ações</span>
              <button
                class="px-3 py-2 text-xs font-medium text-white bg-brand-green rounded-full hover:bg-emerald-700 transition"
                @click="handleOpenUserForm"
              >
                Cadastrar Usuário
              </button>
           </div>

          </div>

          <div class="space-y-3 mt-4" v-if="!loading">
            <BaseRow
              v-for="(item, index) in items"
              :key="index"
              :fields="mapFields(item)"
              :actions="getActions(item)"
              :showActions="isUserRoute"
              @edit="handleEdit(item)"
              @delete="handleDelete(item.id)"
              @openMenu="handleOpenMenu(item)"
            />
          </div>
          <LoadingSpinner v-else />
        </div>
      </div>
    </main>
    <MoreActions
      v-if="showMoreActions"
      @close="showMoreActions = false"
      @edit="handleEdit(selectedItem)"
      @delete="handleDelete(selectedItem.id)"
    />
    <ConfirmDelete
      v-if="showConfirmDelete"
      :title="'Confirmar exclusão'"
      :targetLabel="'este usuário'"
      @confirm="confirmDelete"
      @cancel="showConfirmDelete = false"
    />
    <UserFormModal
      v-if="showUserFormModal"
      @close="showUserFormModal = false"
      @submit="handleSubmitUserForm"
    />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import BaseRow from '../components/BaseRow.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import UserFormModal from '../components/UserFormModal.vue';
import MoreActions from '../components/MoreActions.vue';
import ConfirmDelete from '../components/ConfirmDelete.vue';
import { getOrders } from '../services/orderService';
import { getUsers, deleteUser, createUser } from '../services/userService';
import { useToast } from 'vue-toastification';


export default {
  components: { Sidebar, BaseRow, LoadingSpinner, MoreActions, ConfirmDelete, UserFormModal, UserFormModal, },
  data() {
    return {
      items: [],
      loading: false,
      showMoreActions: false,
      showConfirmDelete: false,
      selectedItem: null,
      showUserFormModal: false,
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
  setup() {
    const toast = useToast();
    return { toast };
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
    handleOpenMenu(item) {
      this.selectedItem = item;
      this.showMoreActions = true;
    },
    handleEdit(item) {
      console.log('Editar usuário:', item);
      this.showMoreActions = false;
    },
    handleDelete(id) {
      this.selectedItemId = id;
      this.showMoreActions = false;
      this.showConfirmDelete = true;
    },
    async confirmDelete() {
      try {
        await deleteUser(this.selectedItemId);
        this.items = await getUsers();
        this.toast.success('Usuário deletado com sucesso!');
      } catch (err) {
        const mensagem = err?.response?.data?.message || 'Erro ao deletar usuário';
        this.toast.error(mensagem);
      } finally {
        this.showConfirmDelete = false;
      }
    },
    handleOpenUserForm() {
      this.showUserFormModal = true;
    },
    async handleSubmitUserForm(formData) {
      try {
        await createUser(formData);
        this.showUserFormModal = false;
        this.items = await getUsers();
        this.toast.success('Usuário cadastrado com sucesso!');
      } catch (err) {
        const mensagem = err?.response?.data?.message || 'Erro ao cadastrar usuário';
        this.toast.error(mensagem);
        console.error('Erro ao cadastrar usuário:', mensagem);
      }
    },
  },
};
</script>
