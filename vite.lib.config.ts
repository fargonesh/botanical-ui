import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: 'src/lib',
      include: [
        'src/lib/**/*.ts',
        'components/**/*.tsx',
        'components/**/*.ts',
        'contexts/**/*.tsx',
        'hooks/**/*.ts',
        'utils.ts',
        'types.ts'
      ],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        'App.tsx',
        'index.tsx',
        'views/**/*',
        'examples/**/*',
        'node_modules/**'
      ],
      tsconfigPath: './tsconfig.lib.json'
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'BotanicalUI',
      fileName: (format) => `index.${format === 'es' ? 'es.js' : format === 'umd' ? 'umd.js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'lucide-react', 'highlight.js', 'fast-average-color', 'chart.js', 'react-chartjs-2'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.es.js'
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs'
        },
        {
          format: 'umd',
          name: 'BotanicalUI',
          entryFileNames: 'index.umd.js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'lucide-react': 'lucideReact',
            'highlight.js': 'hljs',
            'fast-average-color': 'FastAverageColor',
            'chart.js': 'Chart',
            'react-chartjs-2': 'ReactChartjs2'
          }
        }
      ]
    },
    minify: 'terser'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  }
});
