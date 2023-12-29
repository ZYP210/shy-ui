import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import path from 'path';
import url from '@rollup/plugin-url';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCss(),
    AutoImport({
      /* options */
      imports: ['vue', 'vue-router'],
      dts: true,
      // eslintrc: {
      //   enabled: false, // <-- this
      // },
    }),
    url({
      include: ['**/*.jpg', '**/*.png', '**/*.svg'],
      // 输出路径
      dest: 'dist/assets',
      // 超过10kb则拷贝否则转base64
      limit: 10 * 1024, // 10KB
    }),
    Components({
      // resolvers: [AntDesignVueResolver()],
    }),
  ],

  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('lib') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('lib/types') + '/',
      },
    ],
  },

  server: {
    proxy: {
      '/zutai': {
        target: 'http://192.168.1.190:30082/app-iot/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zutai/, ''),
      },
    },
  },

  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'dist',
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    assetsInlineLimit: 1024 * 1024 * 1024,
    rollupOptions: {
      //忽略打包vue文件
      external: [
        '/js/icon-font.js?url',
        '/js/echarts.min.js?url',
        '/js/canvas2svg.js?url',
      ],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].es.js',
          //让打包目录和我们目录对应
          preserveModules: false,
          //配置打包根目录
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs.js',
          //让打包目录和我们目录对应
          preserveModules: false,
          //配置打包根目录
          dir: 'dist',
          preserveModulesRoot: 'src',
        },
      ],
      plugins: [
        // 处理通过img标签引入的图片
      ],
    },
    lib: {
      entry: './lib/index.ts',
      formats: ['es', 'cjs'],
    },
  },
});
