import { createRouter, createWebHistory } from 'vue-router';
import MarketingLayout from '@/layouts/MarketingLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useAdminAuthStore } from '@/stores/adminAuth';
import { useClientConfigStore } from '@/stores/clientConfig';

const marketingRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: 'guia-apa-7',
    name: 'guia-apa-7',
    component: () => import('@/views/guides/GuiaApa7View.vue'),
  },
  {
    path: 'portada-apa',
    name: 'portada-apa',
    component: () => import('@/views/guides/PortadaApaView.vue'),
  },
  {
    path: 'citas-apa',
    name: 'citas-apa',
    component: () => import('@/views/guides/CitasApaView.vue'),
  },
  {
    path: 'referencias-apa',
    name: 'referencias-apa',
    component: () => import('@/views/guides/ReferenciasApaView.vue'),
  },
  {
    path: 'tablas-figuras',
    name: 'tablas-figuras',
    component: () => import('@/views/guides/TablasFigurasView.vue'),
  },
  {
    path: 'ejemplos-apa',
    name: 'ejemplos-apa',
    component: () => import('@/views/guides/EjemplosApaView.vue'),
  },
  {
    path: 'apa-generator',
    name: 'apa-generator',
    component: () => import('@/views/ApaGeneratorView.vue'),
  },
  {
    path: 'precios',
    name: 'precios',
    component: () => import('@/views/PricingView.vue'),
  },
  {
    path: 'politica-privacidad',
    name: 'legal-privacy',
    component: () => import('@/views/legal/LegalDocumentView.vue'),
    props: { documentKey: 'privacy', path: '/politica-privacidad' },
  },
  {
    path: 'terminos-y-condiciones',
    name: 'legal-terms',
    component: () => import('@/views/legal/LegalDocumentView.vue'),
    props: { documentKey: 'terms', path: '/terminos-y-condiciones' },
  },
  {
    path: 'politica-suscripciones',
    name: 'legal-subscriptions',
    component: () => import('@/views/legal/LegalDocumentView.vue'),
    props: { documentKey: 'subscriptions', path: '/politica-suscripciones' },
  },
  {
    path: 'politica-cookies',
    name: 'legal-cookies',
    component: () => import('@/views/legal/LegalDocumentView.vue'),
    props: { documentKey: 'cookies', path: '/politica-cookies' },
  },
];

const routes = [
  {
    path: '/',
    component: MarketingLayout,
    children: marketingRoutes,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/registro/checkout',
    name: 'registration-checkout',
    component: () => import('@/views/CheckoutRegistrationView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/app',
    component: () => import('@/layouts/AppShellLayout.vue'),
    meta: { requiresCheckout: true },
    children: [
      { path: '', redirect: { name: 'apa-generator' } },
      { path: 'conversor', redirect: { name: 'apa-generator' } },
      { path: 'guia-apa7', redirect: { name: 'guia-apa-7' } },
      { path: 'referencias', redirect: { name: 'referencias-apa' } },
      { path: 'tablas-imagenes', redirect: { name: 'tablas-figuras' } },
      {
        path: 'configuracion-apa',
        name: 'app-apa-settings',
        component: () => import('@/views/app/ApaSettingsView.vue'),
      },
    ],
  },
  {
    path: '/app/seleccion-carrera',
    name: 'career-selection',
    component: () => import('@/views/CareerSelectionView.vue'),
    meta: { requiresCheckout: true },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminShellLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: { name: 'admin-dashboard' } },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboardView.vue'),
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/AdminUsersView.vue'),
      },
      {
        path: 'universities',
        name: 'admin-universities',
        component: () => import('@/views/admin/AdminUniversitiesView.vue'),
      },
      {
        path: 'careers',
        name: 'admin-careers',
        component: () => import('@/views/admin/AdminCareersView.vue'),
      },
      {
        path: 'content-categories',
        name: 'admin-content-categories',
        component: () => import('@/views/admin/AdminContentCategoriesView.vue'),
      },
      {
        path: 'document-templates',
        name: 'admin-document-templates',
        component: () => import('@/views/admin/AdminDocumentTemplatesView.vue'),
      },
      {
        path: 'payments',
        name: 'admin-payments',
        component: () => import('@/views/admin/AdminPaymentsView.vue'),
      },
      {
        path: 'ai',
        name: 'admin-ai',
        component: () => import('@/views/admin/AdminAiView.vue'),
      },
      {
        path: 'ads',
        name: 'admin-ads',
        component: () => import('@/views/admin/AdminAdsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

function routeNeedsAuthBootstrap(to) {
  if (to.meta.requiresAuth || to.meta.requiresCheckout || to.meta.requiresAdmin) {
    return true;
  }
  if (to.path.startsWith('/admin') || to.path.startsWith('/app')) {
    return true;
  }
  return false;
}

router.beforeEach(async (to) => {
  const clientConfig = useClientConfigStore();
  if (!clientConfig.loaded) {
    await clientConfig.bootstrap();
  }

  if (to.path.startsWith('/admin')) {
    const adminAuth = useAdminAuthStore();

    if (to.name === 'admin-login') {
      if (adminAuth.token) {
        if (!adminAuth.hydrated) {
          await adminAuth.fetchMe();
        }
        if (adminAuth.admin) {
          return { name: 'admin-dashboard' };
        }
      } else {
        adminAuth.markGuestReady();
      }
      return true;
    }

    if (!adminAuth.token) {
      return { name: 'admin-login', query: { redirect: to.fullPath } };
    }
    if (!adminAuth.hydrated) {
      await adminAuth.fetchMe();
    }
    if (!adminAuth.admin) {
      return { name: 'admin-login', query: { redirect: to.fullPath } };
    }
    return true;
  }

  const auth = useAuthStore();
  if (!auth.bootstrapped) {
    if (routeNeedsAuthBootstrap(to)) {
      await auth.restoreSession();
    } else {
      auth.restoreSession();
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  const mustFinishCheckout = auth.isAuthenticated && auth.needsRegistrationCheckout;

  if (to.meta.requiresCheckout && mustFinishCheckout) {
    if (to.name !== 'registration-checkout') {
      return { name: 'registration-checkout', query: { redirect: to.fullPath } };
    }
  }

  if (to.name === 'registration-checkout') {
    if (!auth.isAuthenticated) {
      return { name: 'login', query: { redirect: to.fullPath } };
    }
    if (!mustFinishCheckout) {
      const r = to.query.redirect;
      if (typeof r === 'string' && r.startsWith('/')) {
        return r;
      }
      return { name: 'apa-generator' };
    }
  }

  return true;
});

export default router;
