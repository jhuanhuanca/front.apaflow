<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Menu, X } from 'lucide-vue-next';
import { useAdminAuthStore } from '@/stores/adminAuth';
import { useRouter } from 'vue-router';

const adminAuth = useAdminAuthStore();
const router = useRouter();
const sidebarOpen = ref(false);

const links = [
  { to: '/admin/dashboard', label: 'KPI' },
  { to: '/admin/users', label: 'Usuarios' },
  { to: '/admin/universities', label: 'Universidades' },
  { to: '/admin/careers', label: 'Carreras' },
  { to: '/admin/content-categories', label: 'Categorías' },
  { to: '/admin/document-templates', label: 'Plantillas' },
  { to: '/admin/payments', label: 'Pagos' },
  { to: '/admin/ads', label: 'Anuncios' },
  { to: '/admin/ai', label: 'IA / Python' },
];

async function logout() {
  sidebarOpen.value = false;
  await adminAuth.logout();
  await router.push('/admin/login');
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink flex flex-col lg:flex-row overflow-x-hidden">
    <!-- Overlay móvil -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
      @click="closeSidebar"
    />

    <aside
      class="fixed lg:sticky top-0 left-0 z-50 h-full w-64 shrink-0 border-r border-line bg-deep flex flex-col transform transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="p-4 border-b border-line flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="font-display text-sm">Panel SaaS</p>
          <p class="text-xs text-ink-faint truncate">{{ adminAuth.admin?.email }}</p>
        </div>
        <button type="button" class="lg:hidden p-1.5 rounded-lg hover:bg-midnight" aria-label="Cerrar menú" @click="closeSidebar">
          <X class="w-5 h-5" />
        </button>
      </div>
      <nav class="flex-1 p-2 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="block rounded-lg px-3 py-2.5 text-sm text-ink-secondary hover:bg-midnight hover:text-ink min-h-[44px] flex items-center"
          active-class="bg-midnight text-brand font-medium"
          @click="closeSidebar"
        >
          {{ l.label }}
        </RouterLink>
      </nav>
      <div class="p-2 border-t border-line">
        <button
          type="button"
          class="w-full text-left text-xs text-ink-muted hover:text-ink px-3 py-2.5 min-h-[44px]"
          @click="logout"
        >
          Cerrar sesión admin
        </button>
        <RouterLink to="/" class="block text-xs text-ink-faint hover:text-ink px-3 py-2.5" @click="closeSidebar">
          ← Sitio público
        </RouterLink>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 min-h-full">
      <header class="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 border-b border-line bg-midnight/95 backdrop-blur-sm">
        <button
          type="button"
          class="touch-target inline-flex items-center justify-center p-2 rounded-lg border border-line"
          aria-label="Abrir menú admin"
          @click="sidebarOpen = true"
        >
          <Menu class="w-5 h-5" />
        </button>
        <p class="font-display text-sm truncate">Admin</p>
      </header>
      <main class="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <RouterView />
      </main>
    </div>
  </div>
</template>
