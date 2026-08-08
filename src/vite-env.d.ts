/// <reference types="vite/client" />

// Figma Make exports images as `figma:asset/<hash>.png` imports. The custom
// `figmaAssetResolver` plugin in vite.config.ts rewrites these to files in
// src/assets at build time — this tells TypeScript what they resolve to.
declare module "figma:asset/*" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
