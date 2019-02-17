<template lang="pug">
  v-container
    v-layout
      v-flex
        v-card
          v-card-title
            h1 Beer Submission
          v-card-text
            h1 Brewery Information
            P 1. Beer Name
            v-text-field(v-model="beerName")
            P 2. Brewery Name
            v-text-field(v-model="breweryName")
            p 3. Brewer
            v-text-field(v-model="brewer")
            p 4. Brew Date
            v-date-picker(landscape reactive v-model="date")
            p.mt-2 5. Ethereum Address where the Smart Contract is Deployed
            v-text-field( label="ETH Address" v-model="ethaddress")
        
        v-card(light)
          v-card-title
            h1 Ingredients - What is in the Beer
          v-card-text
            P 1. Hops
            v-text-field(v-model="hops")
            P 2. Grain
            v-text-field(v-model="grain")
            p 3. Yeast
            v-text-field(v-model="yeast")
            p 4. Water
            v-text-field(v-model="water")
            p 5. Adjuncts
            v-text-field(v-model="adjuncts")
            p 6. Additives
            v-text-field(v-model="additives")
          v-card-actions
            v-btn.black--text(@click.stop="uportAdd" block large color="primary") Submit


</template>
<script>
import { store } from '../store';
import 'firebase/auth';
import { Connect } from 'uport-connect'

const uport = new Connect('Crypto-Catalyst', {network: 'mainnet'})

  export default {
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        beerName: '',
        breweryName: '',
        brewer: '',
        ethaddress: '',
        hops: '',
        grain: '',
        yeast: '',
        water: '',
        adjuncts: '',
        additives: '',
        time: 0,
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
          this.submitTime(this.visitor)
        })
      },
      submitTime () {
        if (this.name !== '') {
          // Native form submission is not yet supported
          store.writeTimeSubmission(this.timeSubmission, this.visitor);
          // console.log('trying to send')
          // console.log(this.timeSubmission, this.visitor)
        } else {
          // console.log('fail')
        }
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
      timeSubmission () {
        return {
        timesub_date: this.date,
        timesub_beerName: this.beerName,
        timesub_breweryName: this.breweryName,
        timesub_brewer: this.brewer,
        timesub_hops: this.hops,
        timesub_grain: this.grain,
        timesub_yeast: this.yeast,
        timesub_water: this.water,
        timesub_adjuncts: this.adjuncts,
        timesub_ethaddress: this.ethaddress,
        timesub_additives: this.additives,
        }
      }
    }
  }
</script>