<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAdminAuthStore } from '@/stores/adminAuth';
import PsButton from '@panelsaas/components/PsButton.vue';
import PsInput from '@panelsaas/components/PsInput.vue';

const router = useRouter();
const adminAuth = useAdminAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    await adminAuth.login({ email: email.value, password: password.value });
    await router.push('/admin/dashboard');
  } catch (e) {
    const msg = e?.response?.data?.message;
    const errs = e?.response?.data?.errors;
    error.value =
      (errs && Object.values(errs).flat().join(' ')) || msg || 'No se pudo iniciar sesión como administrador.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-full bg-midnight text-ink flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md bg-deep border border-line rounded-2xl p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-display text-2xl">Admin SaaS</h1>
        <RouterLink to="/" class="text-ink-faint hover:text-ink text-sm">Sitio público</RouterLink>
      </div>
      <p class="text-xs text-ink-faint mb-6">Acceso restringido. Autenticación independiente del área de usuario.</p>
      <form class="space-y-4" @submit.prevent="submit">
        <PsInput id="admin-email" v-model="email" label="Correo" type="email" autocomplete="username" />
        <PsInput id="admin-password" v-model="password" label="Contraseña" type="password" autocomplete="current-password" />
        <p v-if="error" class="text-sm text-red-300">{{ error }}</p>
        <PsButton type="submit" :disabled="loading">{{ loading ? 'Entrando…' : 'Entrar' }}</PsButton>
      </form>
    </div>
  </div>
</template>
