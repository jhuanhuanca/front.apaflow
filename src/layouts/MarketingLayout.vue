<script setup>
import { RouterView } from 'vue-router';
import SiteNavbar from '@/components/layout/SiteNavbar.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
</script>

<template>
  <div class="min-h-full flex flex-col text-ink">
    <SiteNavbar />
    <main class="site-nav-offset-home flex-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
