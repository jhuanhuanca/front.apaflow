import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import http, { initSanctumSpaOnce, resetSanctumSpaBootstrap } from '@/services/api';

/**
 * Sanctum SPA: sesión por cookie + CSRF.
 * GET /api/user es público y devuelve null si no hay sesión (sin 401).
 * CSRF: initSanctumSpaOnce solo desde restoreSession (router) y re-bootstrap tras logout.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const bootstrapped = ref(false);

  const isAuthenticated = computed(() => Boolean(user.value?.id));

  /** Demo post-registro: falta completar checkout simulado (solo si el backend deja registration_checkout_completed_at en null). */
  const needsRegistrationCheckout = computed(
    () => Boolean(user.value?.id && !user.value?.registration_checkout_completed_at),
  );

  async function restoreSession() {
    if (bootstrapped.value) {
      return;
    }
    try {
      try {
        await initSanctumSpaOnce();
      } catch {
        resetSanctumSpaBootstrap();
        user.value = null;
        return;
      }
      const { data } = await http.get('/api/user');
      user.value = data;
    } catch {
      user.value = null;
    } finally {
      bootstrapped.value = true;
    }
  }

  async function register(payload) {
    const { data } = await http.post('/api/register', payload);
    user.value = data.user;
  }

  async function login(payload) {
    const { data } = await http.post('/api/login', payload);
    user.value = data.user;
  }

  async function fetchUser() {
    const { data } = await http.get('/api/user');
    user.value = data;
  }

  async function logout() {
    try {
      await http.post('/api/logout');
    } catch {
      /* noop */
    }
    user.value = null;
    resetSanctumSpaBootstrap();
    try {
      const { useCareerSelectionStore } = await import('@/stores/careerSelection');
      useCareerSelectionStore().clearSelection();
    } catch {
      /* noop */
    }
    try {
      await initSanctumSpaOnce();
    } catch {
      /* noop */
    }
  }

  return {
    user,
    bootstrapped,
    isAuthenticated,
    needsRegistrationCheckout,
    restoreSession,
    register,
    login,
    fetchUser,
    logout,
  };
});
