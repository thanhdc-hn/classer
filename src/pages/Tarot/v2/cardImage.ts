/**
 * Card faces in public/deck are 360px-wide webp (~60 KB each); preload them
 * during the shuffle so a flipped card never shows a blank face.
 */

// Keep references so the browser does not evict decoded images early
const cache = new Map<string, HTMLImageElement>();

/** Warm the HTTP + decode cache for every card face in the background. */
export const preloadCardImages = (images: (string | undefined)[]) => {
  images.forEach((src) => {
    if (!src || cache.has(src)) return;
    const img = new Image();
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.src = src;
    cache.set(src, img);
  });
};
