import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  tsconfig: 'tsconfig.json',
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: false,
  format: ['esm'],
  target: 'node18',
});
