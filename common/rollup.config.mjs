import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';

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
    external: ['react', 'axios', '@tanstack/react-query', 'i18next', 'react-i18next'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/yellow-common.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
];
