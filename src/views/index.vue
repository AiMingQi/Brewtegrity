<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      div.pa-3.text-xs-center
        v-btn.black--text(to="/all-evidence" color="primary" large) What is Brewtegrity?
        h2 What's in your Beer?
        v-card.pt-5.pb-1.px-3.mt-5
          v-img(src="" alt="Crypto Catalyst Logo" max-width="400px" height="400px" class="mb-5 center" style="margin: 0 auto;")
        
</template>

<script>
import { store } from '../store';
import 'firebase/auth';
import { Connect } from 'uport-connect'

const uport = new Connect('Crypto-Catalyst', {network: 'mainnet'})

export default {
  data () {
    return {
      dialog: false,
      visitor: {
        visitor: {
          avatar: {
            uri: '/main-logo.png'
            }
        },
        payload: {
          name: 'Friend',
          country: 'Earth'
        }
      },
      store
    }
  },
  updated () {
    this.uportAdd
  },
  methods: {
    uportAdd () {
      uport.requestDisclosure({
        requested: ['name','country','email','avatar'],
        notifications: true
      })
      uport.onResponse('disclosureReq').then(payload => {
        this.visitor = payload
        // console.log(payload)
        // console.log(this.visitor)
        this.submitVisitor(this.visitor)
      })
    },
    submitVisitor () {
      if (this.visitor.payload.name !== 'Friend') {
        // Native form submission is not yet supported
        store.writeVisitor(this.visitor);
        // console.log('trying to send')
        // console.log(this.visitor)
        // this.$router.push('/all-evidence')
        this.dialog = true
      }
    }
  },
  computed: {
    newVisitor () {
      return {
        someone: this.visitor
      }
    }
  }
}
</script>

<style>
.videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>