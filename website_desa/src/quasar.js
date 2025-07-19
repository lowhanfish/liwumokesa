import Vue from 'vue'

import './styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'


import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  iconSet: iconSet, 
  extras: ['font-awesome-v4.7.0'],
 })