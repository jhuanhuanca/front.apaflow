# UI kit Panel SaaS (`@panelsaas`)

Componentes reutilizables del panel admin. Se empaquetan dentro de **`frontend-vue/dist`** en producción.

## Componentes

- `components/PsPageHeader.vue`
- `components/PsButton.vue`
- `components/PsInput.vue`
- `components/PsDataTable.vue`
- `components/PsCard.vue`
- `charts/PsBarChart.vue`

## Uso

```vue
import PsPageHeader from '@panelsaas/components/PsPageHeader.vue';
```

Alias configurado en `frontend-vue/vite.config.js`.

## Producción

No hay build separado. Al ejecutar `npm run build:prod` en `frontend-vue`, estos componentes quedan incluidos en el bundle servido en:

- https://apaflow.shop/admin/*
- https://admin.apaflow.shop/admin/*

La carpeta raíz `panelsas/` es solo un scaffold futuro; ver `panelsas/README.md`.
