import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import ComponentImport from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import PurgeIcons from 'vite-plugin-purge-icons'
import { generateModifyVars } from './build/generateModifyVars'
import Pages from 'vite-plugin-pages'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild = false): Plugin {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]'
  })
  return svgIconsPlugin as unknown as Plugin
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      ignore: ['h'],
      dts: './types/auto-imports.d.ts',
      imports: ['vue', 'vue-router']
    }),
    ComponentImport({
      dts: './types/components.d.ts',
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    }),
    Pages({
      dirs: ['./src/views']
    }),
    WindiCSS(),
    PurgeIcons(),
    configSvgIconsPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.206:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
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
        javascriptEnabled: true,
        modifyVars: generateModifyVars()
      }
    }
  }
})
