import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { generateModifyVars } from './build/generate/generateModifyVars'
import PurgeIcons from 'vite-plugin-purge-icons'
import WindiCSS from 'vite-plugin-windicss'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  build: {
    target: 'modules',
    //打包文件目录
    outDir: 'es',
    //压缩
    minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: [
        'vue',
        'vxe-table',
        'xe-utils',
        'ant-design-vue',
        '@logicflow/core',
        '@logicflow/extension',
        '@shy-plugins/use',
        '@shy-plugins/utils',
        '@zxcvbn-ts/core',
        'sortablejs',
        'virtual:svg-icons-names',
        '@logicflow/core',
        '@purge-icons/generated',
        '@shy-plugins/use',
        'codemirror',
        'vite-plugin-purge-icons',
        'ant-design-vue/es/locale/zh_CN',
        'qrcode'
      ],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: false,
          //配置打包根目录
          dir: 'es',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: false,
          //配置打包根目录
          dir: 'lib',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS() as unknown as Plugin,
    PurgeIcons() as unknown as Plugin,
    dts({
      //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: '../../tsconfig.ui.json'
    })
    //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个
  ],
  resolve: {
    alias: [
      // {
      //   find: 'vue-i18n',
      //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      // },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true
      }
    }
  }
})
