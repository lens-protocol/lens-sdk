import { resolve } from 'node:path';
import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    environment: 'happy-dom',
    setupFiles: [resolve(__dirname, './vitest.setup.ts')],
  },
});
