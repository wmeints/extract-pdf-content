import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.mjs',
                format: 'esm',
                sourcemap: true
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                sourcemap: true
            }
        ],
        plugins: [
            nodeResolve({
                preferBuiltins: true
            }),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false // we emit .d.ts using tsc separately
            })
        ],
        external: ['pdfjs-dist']
    }
]);
