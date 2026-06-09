<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Crown, Loader2, Lock, Save } from 'lucide-vue-next';
import http from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useClientConfigStore } from '@/stores/clientConfig';
import { useSubscriptionStore } from '@/stores/subscription';
import { useI18n } from '@/composables/useI18n';

const auth = useAuthStore();
const clientConfig = useClientConfigStore();
const subscription = useSubscriptionStore();
const { t } = useI18n();

const loading = ref(true);
const saving = ref(false);
const message = ref('');
const error = ref('');
const settings = ref(null);
const canCustomize = ref(false);

const lineSpacing = computed({
  get: () => settings.value?.line_spacing ?? 2,
  set: (v) => {
    if (settings.value) settings.value.line_spacing = Number(v);
  },
});

async function loadSettings() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await http.get('/api/apa-settings');
    settings.value = {
      margins_in: { top: 1, bottom: 1, left: 1, right: 1 },
      ...(data.settings ?? clientConfig.apaDefaults ?? {}),
    };
    canCustomize.value = Boolean(data.can_customize);
  } catch (e) {
    error.value = e?.response?.data?.message || t('app.settings.loadError');
    settings.value = { ...(clientConfig.apaDefaults ?? {}) };
    canCustomize.value = false;
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  if (!canCustomize.value) return;
  saving.value = true;
  message.value = '';
  error.value = '';
  try {
    const { data } = await http.put('/api/apa-settings', { settings: settings.value });
    settings.value = data.settings;
    message.value = data.message || t('app.settings.saved');
  } catch (e) {
    error.value = e?.response?.data?.message || t('app.settings.saveError');
  } finally {
    saving.value = false;
  }
}

onMounted(loadSettings);
</script>

<template>
  <div class="page-shell max-w-3xl">
    <div class="mb-8">
      <h1 class="font-display text-2xl md:text-3xl mb-2">{{ t('app.settings.title') }}</h1>
      <p class="text-ink-muted text-sm">{{ t('app.settings.description') }}</p>
    </div>

    <div
      v-if="!subscription.canCustomizeApa"
      class="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6 flex gap-4"
    >
      <Lock class="w-6 h-6 text-amber-200 shrink-0 mt-0.5" />
      <div>
        <p class="font-medium text-amber-100">{{ t('app.settings.lockedTitle') }}</p>
        <p class="text-sm text-amber-100/80 mt-1">{{ t('app.settings.lockedDesc') }}</p>
        <RouterLink
          v-if="auth.isAuthenticated"
          to="/apa-generator"
          class="inline-flex items-center gap-2 mt-3 text-sm text-accent hover:underline"
        >
          <Crown class="w-4 h-4" />
          {{ t('app.settings.lockedCta') }}
        </RouterLink>
      </div>
    </div>

    <div v-if="loading" class="flex items-center gap-2 text-ink-muted text-sm">
      <Loader2 class="w-5 h-5 animate-spin" />
      {{ t('app.settings.loading') }}
    </div>

    <form v-else class="space-y-6" @submit.prevent="saveSettings">
      <fieldset :disabled="!canCustomize" class="space-y-6 disabled:opacity-70">
        <section class="rounded-2xl border border-line bg-surface/50 p-5 space-y-4">
          <h2 class="font-display text-lg">{{ t('app.settings.lineSpacing') }}</h2>
          <label class="block text-xs text-ink-muted mb-1">{{ t('app.settings.lineSpacingHelp') }}</label>
          <select
            v-model="lineSpacing"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm"
          >
            <option :value="1">{{ t('app.settings.single') }}</option>
            <option :value="1.5">{{ t('app.settings.oneHalf') }}</option>
            <option :value="2">{{ t('app.settings.double') }}</option>
          </select>
        </section>

        <section class="rounded-2xl border border-line bg-surface/50 p-5 space-y-4">
          <h2 class="font-display text-lg">{{ t('app.settings.margins') }}</h2>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="side in ['top', 'bottom', 'left', 'right']" :key="side">
              <label class="block text-xs text-ink-muted mb-1 capitalize">{{ side }}</label>
              <input
                v-model.number="settings.margins_in[side]"
                type="number"
                min="0.5"
                max="2"
                step="0.1"
                class="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-line bg-surface/50 p-5 space-y-4">
          <h2 class="font-display text-lg">{{ t('app.settings.typography') }}</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-ink-muted mb-1">{{ t('app.settings.font') }}</label>
              <input
                v-model="settings.font"
                type="text"
                class="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label class="block text-xs text-ink-muted mb-1">{{ t('app.settings.fontSize') }}</label>
              <input
                v-model.number="settings.font_size_pt"
                type="number"
                min="10"
                max="14"
                class="w-full rounded-xl border border-line bg-surface px-4 py-2 text-sm"
              />
            </div>
          </div>
        </section>
      </fieldset>

      <p v-if="message" class="text-sm text-emerald-300">{{ message }}</p>
      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button
        v-if="canCustomize"
        type="submit"
        class="inline-flex items-center gap-2 rounded-full bg-accent text-cream hover:bg-brand-dark px-6 py-3 text-sm font-medium disabled:opacity-50"
        :disabled="saving"
      >
        <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
        <Save v-else class="w-4 h-4" />
        {{ t('app.settings.save') }}
      </button>
    </form>
  </div>
</template>
