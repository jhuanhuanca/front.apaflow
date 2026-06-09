import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import adminHttp from '@/services/adminApi';

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const token = ref(typeof window !== 'undefined' ? window.sessionStorage.getItem('admin_token') : null);
  const admin = ref(null);
  const hydrated = ref(false);

  const isAuthenticated = computed(() => Boolean(token.value));

  function persistToken(t) {
    token.value = t;
    if (typeof window !== 'undefined') {
      if (t) window.sessionStorage.setItem('admin_token', t);
      else window.sessionStorage.removeItem('admin_token');
    }
  }

  async function login(payload) {
    const { data } = await adminHttp.post('/admin/login', payload);
    persistToken(data.token);
    admin.value = data.admin;
    hydrated.value = true;
  }

  async function fetchMe() {
    if (!token.value) {
      admin.value = null;
      hydrated.value = true;
      return;
    }
    try {
      const { data } = await adminHttp.get('/admin/me');
      admin.value = data;
    } catch {
      persistToken(null);
      admin.value = null;
    } finally {
      hydrated.value = true;
    }
  }

  async function logout() {
    try {
      await adminHttp.post('/admin/logout');
    } catch {
      /* noop */
    }
    persistToken(null);
    admin.value = null;
    hydrated.value = true;
  }

  function markGuestReady() {
    hydrated.value = true;
  }

  return {
    token,
    admin,
    hydrated,
    isAuthenticated,
    login,
    fetchMe,
    logout,
    persistToken,
    markGuestReady,
  };
});
