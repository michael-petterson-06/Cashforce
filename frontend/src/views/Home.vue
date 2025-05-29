<template>
  <div class="flex min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
    <Sidebar class="hidden md:block" />
    <main class="flex-1 bg-white dark:bg-gray-900 transition-colors">
      <div class="block md:hidden px-6 pt-6">
        <img src="/Logo.svg" alt="Cashforce Logo" class="h-6 mb-4" />
      </div>
      <div class="pt-16">
        <div class="h-[1px] w-full bg-[#DFE2EB] dark:bg-gray-700"></div>
      </div>

      <div class="px-4 md:px-16 pt-[42px]">
        <div class="flex items-center gap-2 mb-1">
          <img src="/Vector-2.svg" alt="Ícone" class="w-5 h-5" />
          <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ isUserRoute ? 'Usuários' : 'Notas fiscais' }}
          </h1>
        </div>

        <div v-if="isUserRoute" class="mb-4 flex items-center gap-3">
          <input
            v-model="userFilter"
            type="text"
            placeholder="Buscar por nome..."
            class="w-full max-w-xs px-4 py-2 text-sm border border-[#DFE2EB] dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto transition-colors">
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
              v-for="(item, index) in paginatedItems"
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

        <div
          v-if="isUserRoute && filteredItems.length > itemsPerPage"
          class="flex justify-center mt-4 gap-2 bg-white dark:bg-gray-900 transition-colors px-4 py-4"
        >

          <button
            class="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-emerald-700 transition disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Anterior
          </button>

          <span class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
            Página {{ currentPage }} de {{ totalPages }}
          </span>

          <button
            class="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-full hover:bg-emerald-700 transition disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Próxima
          </button>
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
      :initialData="selectedUser"
      :isEditMode="isEditMode"
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
import { getUsers, deleteUser, createUser, updateUser } from '../services/userService';
import { useToast } from 'vue-toastification';

export default {
  components: { Sidebar, BaseRow, LoadingSpinner, MoreActions, ConfirmDelete, UserFormModal },
  data() {
    return {
      items: [],
      loading: false,
      showMoreActions: false,
      showConfirmDelete: false,
      selectedItem: null,
      showUserFormModal: false,
      isEditMode: false,
      selectedUser: null,
      userFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
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
    filteredItems() {
      if (!this.isUserRoute || !this.userFilter.trim()) {
        return this.items;
      }
      const filter = this.userFilter.toLowerCase();
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(filter)
      );
    },
    paginatedItems() {
      if (!this.isUserRoute) return this.items;
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
  },
  async mounted() {
    await this.loadData();
  },
  watch: {
    userFilter() {
      this.currentPage = 1;
    },
    $route: {
      immediate: false,
      handler() {
        this.currentPage = 1;
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
          { label: 'Email', value: item.email || '-', class: 'text-brand-green' },
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
      this.selectedUser = item;
      this.isEditMode = true;
      this.showMoreActions = false;
      this.showUserFormModal = true;
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
      this.selectedUser = null;
      this.isEditMode = false;
      this.showUserFormModal = true;
    },
    async handleSubmitUserForm(formData) {
      try {
        if (this.isEditMode) {
          await updateUser(formData.id, formData);
          this.toast.success('Usuário atualizado com sucesso!');
        } else {
          await createUser(formData);
          this.toast.success('Usuário cadastrado com sucesso!');
        }

        this.showUserFormModal = false;
        this.items = await getUsers();
      } catch (err) {
        const mensagem = err?.response?.data?.message || 'Erro ao salvar usuário';
        this.toast.error(mensagem);
        console.error('Erro ao salvar usuário:', mensagem);
      }
    },
  },
};
</script>
