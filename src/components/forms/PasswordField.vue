<script setup>
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import { useI18n } from '@/composables/useI18n';

const model = defineModel({ type: String, default: '' });

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  minlength: { type: [Number, String], default: undefined },
  autocomplete: { type: String, default: 'current-password' },
});

const { t } = useI18n();
const visible = ref(false);
</script>

<template>
  <div>
    <label :for="id" class="block text-sm text-ink-muted mb-1.5">{{ label }}</label>
    <div class="relative">
      <input
        :id="id"
        v-model="model"
        :type="visible ? 'text' : 'password'"
        :required="required"
        :minlength="minlength"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full bg-surface border border-line rounded-xl px-4 py-3 pr-11 text-sm text-ink placeholder:text-ink-faint"
      />
      <button
        type="button"
        tabindex="-1"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink p-1 rounded-md"
        :aria-label="visible ? t('common.forms.hidePassword') : t('common.forms.showPassword')"
        @click="visible = !visible"
      >
        <EyeOff v-if="visible" class="w-4 h-4" />
        <Eye v-else class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
