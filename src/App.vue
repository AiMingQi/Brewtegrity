<template lang="pug">
  v-app(dark)
    v-navigation-drawer(
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      light
      app)
      v-card.pa-3(dark)
        h2 Learn about Crypto?
      v-list
        v-list-tile(
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
          )
            v-list-tile-action
              strong {{i+1}}
            v-list-tile-title.index_title(v-text="item.title")
      a(href="https://crypto-catalyst.com" target="_blank")
        v-img.ml-2(src="/banner-logo-cc.png")
      v-divider.my-3
      v-btn.mt-3(href="https://www.coinbase.com/join/595aacbcf7cf5b058fdf5a04" target="_blank" rel="noopener" color="secondary" block large) Get Some Crypto
      v-card.text-xs-center.pb-3
        v-card-text
          v-btn(href="https://coinmarketcap.com" target="_blank" rel="noopener" block color="secondary") Coin Market Cap
          v-btn(href="http://ethdenver.com/" target="_blank" rel="noopener" block color="secondary") ETH Denver
    v-toolbar(fixed app :clipped-left="clipped" height="100px")
      v-toolbar-side-icon(@click="drawer = !drawer")
      v-img(src="/mark.png" max-height="100px" height="12px" min-height="100px" contain position="left")
      //- h2 Brewtegrity™
      v-spacer
      h3.hidden-sm-and-down What's in your beer?
      v-btn(color="primary" to="/") Home
      v-btn(color="secondary" to="/beer-submission") Brewery
    v-content
      v-container
        router-view
    v-footer(:fixed="fixed" app)
      span.ml-5 &copy; 2018 Crypto Catalyst 
      //- span.ml-5 {{store.currentUser.displayName}}
      v-spacer
      v-btn(href="https://brave.com/cry696" target="_blank" rel="noopener") Use Brave Browser
      //- v-btn(@click.prevent="signInWithGoogle" v-if="store.currentUser == null") L
      v-btn(href="mailto:prime@crypto-catalyst.com" target="_blank" rel="noopener" icon flat)
        v-icon email
      

</template>

<script>
import { store } from '@/store';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data () {
    return {
      store,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { title: 'Liquid Democracy', to: '/liquid-democracy' },
        { title: 'Instant Money', to: '/instant-money' },
        { title: 'Democratized VC', to: '/democratized-vc' },
        { title: 'Supply Chain Transparency', to: '/supply-chain-transparency' },
        { title: 'Historical Records', to: '/historical-records' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Crypto Catalyst'
    }
  },
  methods: {
    signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    }
  }
}
</script>
<style scoped>
.index_title { font-size: 1.1em; }

.banner {
  background: url('/banner-bg.png');
  background-repeat: repeat-x;
  }
</style>

<style>

p {
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>

