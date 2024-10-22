/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PRIVATE_KEY: `0x${string}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
