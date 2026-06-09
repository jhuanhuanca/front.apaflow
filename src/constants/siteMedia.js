/** Video de demostración en la landing. Coloca tu archivo en public/videos/demo-apa7.mp4 */
export const DEMO_VIDEO = {
  mp4: import.meta.env.VITE_DEMO_VIDEO_URL || '/videos/demo-apa7.mp4',
  fallbackMp4: 'https://www.w3schools.com/html/mov_bbb.mp4',
  poster: '/images/demo-poster.svg',
  title: 'Cómo formatear tu tesis a APA 7 en minutos',
};
