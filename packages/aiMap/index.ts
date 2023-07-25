import './src/assets/aimap-gl.js'
import './src/style/index.css'
import './src/style/index.less'

import { install } from 'vue-demi'
import AiMap from './src/AiMap'

install()

aimap.accessToken = 'UFJGhyFdSzvm0ZbecYglp6CssgnDK7PZ'
aimap.baseApiUrl = 'https://location-dev.newayz.com'

export { AiMap }
