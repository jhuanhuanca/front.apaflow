<script setup>
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useLocaleStore } from '@/stores/locale';

const { locale } = storeToRefs(useLocaleStore());
</script>

<template>
  <!-- Remonta la vista activa al cambiar idioma → traducción instantánea en toda la página -->
  <RouterView :key="locale" />
</template>
