<template>
  <aside class="w-60 h-full bg-white relative hidden md:block">
    <div class="absolute top-0 -right-[0px] w-[24px] h-full bg-transparent z-0" style="box-shadow: 5px 0 20px rgba(0, 0, 0, 0.06);"></div>

    <div class="px-6 py-4 relative z-20">
      <img src="/Logo.svg" alt="Cashforce Logo" class="h-6 mb-6" />
      <nav class="pt-[35px]">
        <ul>
          <li>
            <router-link
              to="/"
              class="flex items-center relative pl-4 py-2 text-brand-green font-semibold"
              active-class="sidebar-active"
            >
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-12 bg-brand-green rounded-r-full"></div>
              <img src="/Vector.svg" alt="Ícone Notas" class="w-5 h-5 mr-2" />
              Notas fiscais
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>