<script setup>
import { ref } from 'vue';
import { Play } from 'lucide-vue-next';
import { DEMO_VIDEO } from '@/constants/siteMedia';

const videoRef = ref(null);
const src = ref(DEMO_VIDEO.mp4);
const triedFallback = ref(false);
const videoError = ref(false);

function onError() {
  if (!triedFallback.value && DEMO_VIDEO.fallbackMp4) {
    triedFallback.value = true;
    src.value = DEMO_VIDEO.fallbackMp4;
    return;
  }
  videoError.value = true;
}
</script>

<template>
  <div class="relative w-full max-w-3xl mx-auto min-w-0">
    <div class="rounded-2xl border border-line bg-ink overflow-hidden shadow-lift">
      <div v-if="videoError" class="aspect-video flex flex-col items-center justify-center gap-4 bg-deep px-6 text-center">
        <div class="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
          <Play class="w-6 h-6 text-cream ml-0.5" />
        </div>
        <p class="text-sm text-ink-secondary max-w-sm">
          Añade tu video en
          <code class="text-xs bg-white px-1.5 py-0.5 rounded border border-line">public/videos/demo-apa7.mp4</code>.
        </p>
      </div>
      <video
        v-else
        ref="videoRef"
        :key="src"
        class="w-full aspect-video bg-ink object-cover"
        controls
        playsinline
        preload="metadata"
        :poster="DEMO_VIDEO.poster"
        @error="onError"
      >
        <source :src="src" type="video/mp4" />
        Tu navegador no soporta reproducción de video.
      </video>
    </div>
    <p class="mt-3 text-center text-xs text-ink-muted">{{ DEMO_VIDEO.title }}</p>
  </div>
</template>
