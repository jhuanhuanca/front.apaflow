<script setup>
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useLocaleStore } from '@/stores/locale';
import { useClientConfigStore } from '@/stores/clientConfig';
import { usePaddle } from '@/composables/usePaddle';

const { locale } = storeToRefs(useLocaleStore());
const route = useRoute();
const router = useRouter();
const clientConfig = useClientConfigStore();
const paddle = usePaddle();

async function openPtxnFromUrl() {
  const ptxn = route.query._ptxn;
  if (!ptxn || String(ptxn).trim() === '') {
    return;
  }

  if (!clientConfig.loaded) {
    try {
      await clientConfig.bootstrap();
    } catch {
      /* noop */
    }
  }

  if (!clientConfig.paddle?.client_token) {
    return;
  }

  try {
    await paddle.openCheckout(String(ptxn));
    const { _ptxn: _removed, ...rest } = route.query;
    router.replace({ path: route.path, query: rest });
  } catch {
    /* El componente de billing mostrará el error si aplica */
  }
}

onMounted(openPtxnFromUrl);
watch(() => route.query._ptxn, openPtxnFromUrl);
</script>

<template>
  <RouterView :key="locale" />
</template>
