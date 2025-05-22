// build.mjs

import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./Client.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  sourcemap: true,
  format: 'esm',
}).catch(() => process.exit(1));
