import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import ability from './ability'
import { abilitiesPlugin } from '@casl/vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('dfcc469a-f55e-4cdc-9c4b-3390f889b1b4', 'rinkeby');
const web3 = new Web3(portis.provider);

Vue.use(VueAxios, axios)

Vue.use(VueYouTubeEmbed)


// import { Connect } from 'uport-connect'

// const uport = new Connect('Crypto-Catalyst', {network: 'mainnet'})

import 'vuetify/dist/vuetify.min.css' 
import './style/site.css'

// index.js or main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// uport.requestDisclosure({
//   requested: ['name','country'],
//   notifications: true
// })
// uport.onResponse('disclosureReq').then(payload => {
//   const address = payload.address
//   console.log(payload)
// })

Vue.use(abilitiesPlugin, ability)

// TODO: the next line is added for debugging purposes and should be removed for production build
window.ability = ability

Vue.use(Vuetify, {
  theme: {
    primary: '#F0C078',
    secondary: '#99562b'
  }
})

Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
