<script setup>
import { RouterLink } from 'vue-router';
import { Instagram, Mail } from 'lucide-vue-next';
import AppLogo from '@/components/brand/AppLogo.vue';
import { useSiteNav } from '@/composables/useSiteNav';
import { useI18n } from '@/composables/useI18n';
import { useRoutePrefetch } from '@/composables/useRoutePrefetch';
import { SITE_NAME } from '@/constants/siteSeo';

const { footerGuides, footerProduct, footerLegal } = useSiteNav();
const { t } = useI18n();
const { prefetch } = useRoutePrefetch();
</script>

<template>
  <footer class="border-t border-line/80 bg-white/70 backdrop-blur-sm mt-auto">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
      <div class="sm:col-span-2 lg:col-span-1">
        <AppLogo class="h-8 mb-4" />
        <p class="text-sm text-ink-muted leading-relaxed max-w-xs">
          {{ t('nav.footer.description', { brand: SITE_NAME }) }}
        </p>
      </div>

      <div>
        <p class="text-xs uppercase tracking-wider text-ink-faint mb-3">{{ t('nav.footer.guidesTitle') }}</p>
        <ul class="space-y-2">
          <li v-for="link in footerGuides" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-sm text-ink-muted hover:text-accent transition"
              @mouseenter="prefetch(link.to)"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-xs uppercase tracking-wider text-ink-faint mb-3">{{ t('nav.footer.productTitle') }}</p>
        <ul class="space-y-2">
          <li v-for="link in footerProduct" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-sm text-ink-muted hover:text-accent transition"
              @mouseenter="prefetch(link.to)"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-xs uppercase tracking-wider text-ink-faint mb-3">{{ t('nav.footer.legalTitle') }}</p>
        <ul class="space-y-2">
          <li v-for="link in footerLegal" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-sm text-ink-muted hover:text-accent transition"
              @mouseenter="prefetch(link.to)"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-xs uppercase tracking-wider text-ink-faint mb-3">{{ t('nav.footer.contactTitle') }}</p>
        <a
          href="mailto:apaflow@gmail.com"
          class="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition"
        >
          <Mail class="w-4 h-4" />
          apaflow@gmail.com
        </a>
        <a
          href="#"
          class="mt-3 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition"
          aria-label="Instagram"
        >
          <Instagram class="w-4 h-4" />
          @apaflow
        </a>
      </div>
    </div>

    <div class="border-t border-line py-4 text-center text-xs text-ink-faint">
      © {{ new Date().getFullYear() }} {{ SITE_NAME }}. {{ t('nav.footer.copyright') }}
    </div>
  </footer>
</template>
