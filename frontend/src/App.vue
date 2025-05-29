<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
    <div class="flex justify-end">
      <button
        class="mt-4 mr-8 px-3 py-1 bg-brand-green text-white rounded-full shadow"
        @click="toggleTheme"
      >
        {{ isDark ? 'Tema Claro' : 'Tema Escuro' }}
      </button>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false,
    };
  },
  created() {
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme === 'dark';

    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;

      if (this.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
  },
};
</script>
