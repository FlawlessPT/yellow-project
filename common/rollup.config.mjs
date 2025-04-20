import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// TODO: We still don't have a solution for the hotreload. Checek this file to solve this issue
export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript(),
      commonjs({
        include: ['./src/index.ts', 'node_modules/**'],
        ignoreGlobal: false,
        sourceMap: false,
      }),
    ],
    output: [{ file: 'dist/yellow-common.cjs.js', format: 'cjs' }],
    external: ['react', 'axios', '@tanstack/react-query', 'i18next', 'react-i18next', '@supabase/supabase-js'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/yellow-common.d.ts', format: 'cjs' }],
    plugins: [
      alias({
        '@': 'src',
      }),
      nodeResolve(),
      dts(),
    ],
  },
];
