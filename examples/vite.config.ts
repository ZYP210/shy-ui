import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'

import PurgeIcons from 'vite-plugin-purge-icons'
import { generateModifyVars } from './build/generateModifyVars'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export function configSvgIconsPlugin(isBuild = false) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]'
  })

  console.log('svgIconsPlugin', svgIconsPlugin)
  return svgIconsPlugin
}

export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCSS(), PurgeIcons(), configSvgIconsPlugin()],
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
