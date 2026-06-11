<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Play } from 'lucide-vue-next';
import { DEMO_VIDEO } from '@/constants/siteMedia';

const videoRef = ref(null);
const src = ref(DEMO_VIDEO.mp4);
const triedFallback = ref(false);
const videoError = ref(false);

async function tryPlay() {
  const el = videoRef.value;
  if (!el || videoError.value) {
    return;
  }
  try {
    await el.play();
  } catch {
    // Navegadores bloquean autoplay con sonido; muted en el markup lo evita.
  }
}

function onError() {
  if (!triedFallback.value && DEMO_VIDEO.fallbackMp4) {
    triedFallback.value = true;
    src.value = DEMO_VIDEO.fallbackMp4;
    return;
  }
  videoError.value = true;
}

onMounted(() => tryPlay());

watch(src, async () => {
  await nextTick();
  tryPlay();
});
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
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :poster="DEMO_VIDEO.poster"
        :aria-label="DEMO_VIDEO.title"
        @error="onError"
        @loadeddata="tryPlay"
      >
        <source :src="src" type="video/mp4" />
        Tu navegador no soporta reproducción de video.
      </video>
    </div>
    <p class="mt-3 text-center text-xs text-ink-muted">{{ DEMO_VIDEO.title }}</p>
  </div>
</template>
