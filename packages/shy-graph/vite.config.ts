import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ComponentImport from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      dts: '.auto-imports.d.ts',
      imports: ['vue']
    }),
    ComponentImport({
      dts: '.components.d.ts',
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    })
  ],

  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('src/types') + '/'
      }
    ]
  },

  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'dist',
    //压缩
    minify: false,

    copyPublicDir: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue', 'ant-design-vue'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].es.js',
          //让打包目录和我们目录对应
          preserveModules: false,
          //配置打包根目录
          dir: 'dist'
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      formats: ['es']
    }
  }
})
