<template>
   <aside class="w-60 h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative hidden md:block transition-colors">
    <div class="absolute top-0 -right-[0px] w-[24px] h-screen bg-transparent z-0" style="box-shadow: 5px 0 20px rgba(0, 0, 0, 0.06);"></div>
    
    <div class="px-6 py-4 relative z-20">
      <img src="/Logo.svg" alt="Cashforce Logo" class="h-6 mb-6" />
      <nav class="pt-[35px]">
        <ul>
          <li>
            <router-link
              to="/"
              data-testid="notas-button"
              class="flex items-center relative pl-4 py-2 text-brand-green font-semibold"
              :class="{ 'sidebar-active': isNotasRoute }"
            >
              <div v-if="isNotasRoute" class="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-12 bg-brand-green rounded-r-full"></div>
              <img src="/Vector.svg" alt="Ícone Notas" class="w-5 h-5 mr-2" />
              Notas fiscais
            </router-link>
          </li>

          <li class="mt-4">
            <router-link
              to="/usuarios"
              class="flex items-center relative pl-4 py-2 text-brand-green font-semibold"
              active-class="sidebar-active"
              v-slot="{ isActive }"
            >
              <div v-if="isActive" class="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-12 bg-brand-green rounded-r-full"></div>
              <img src="/Vector.svg" alt="Ícone Usuários" class="w-5 h-5 mr-2" />
              Usuários
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script>
export default {
  computed: {
    isNotasRoute() {
      return this.$route.path === '/' || this.$route.path.startsWith('/cedente');
    }
  }
}
</script>