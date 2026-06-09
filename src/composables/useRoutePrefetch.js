import { useRouter } from 'vue-router';

const prefetched = new Set();

/**
 * Precarga el chunk de una ruta al pasar el cursor (navbar/footer).
 */
export function useRoutePrefetch() {
  const router = useRouter();

  function prefetch(to) {
    const target = typeof to === 'string' ? to : to?.path;
    if (!target) return;

    let resolved;
    try {
      resolved = router.resolve(target);
    } catch {
      return;
    }

    resolved.matched.forEach((record) => {
      if (prefetched.has(record.path)) return;
      prefetched.add(record.path);

      const load = record.components?.default;
      if (typeof load === 'function') {
        load();
      }
    });
  }

  return { prefetch };
}
