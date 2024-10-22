/// <reference types="vite/client" />

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type ImportMetaEnv = {};

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
