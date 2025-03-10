/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PRIVATE_KEY: `0x${string}`;
  readonly TEST_ACCOUNT: `0x${string}`;
  readonly TEST_APP: `0x${string}`;
  readonly TEST_ERC20: `0x${string}`;
  readonly ENVIRONMENT: 'testnet' | 'staging' | 'local' | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
