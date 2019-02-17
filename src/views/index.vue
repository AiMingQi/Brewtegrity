<template lang="pug">
  v-layout(column justify-center align-center)
    v-flex(xs12 sm8 md6)
      div.pa-3.text-xs-center
        v-btn.black--text(to="/what-is-brewtegrity" color="primary" large) What is Brewtegrity®?
        v-card.pt-5.pb-1.px-3.mt-5
          v-card-title
            v-img.ma-2(src="/mark.png" max-height="80px" max-width="80px")
            h1 What's in your Beer?
          v-card-text
            h2.mb-3 Scan the barcode on your Brewtegrity® enabled beer. 
            v-img(src="/barcode-temp.jpg" alt="Barcode Scanner" class="mb-5 center" style="margin: 0 auto;")
            p {{OWNER_ADDRESS}}
            v-form
              v-text-field(
                v-model="factoryContract"
                label="Product Key"
                required
                )
              v-btn(@click="tryThis") Submit
        
</template>

<script>
import { store } from '../store';
import 'firebase/auth';
import { Connect } from 'uport-connect'

import Portis from '@portis/web3';
import Web3 from 'web3';

const portis = new Portis('dfcc469a-f55e-4cdc-9c4b-3390f889b1b4', 'rinkeby');
const web3 = new Web3(portis.provider);

const uport = new Connect('Crypto-Catalyst', {network: 'mainnet'})

// const HDWalletProvider = require("truffle-hdwallet-provider")
const MNEMONIC = "hamster useless similar silk junior stairs juice harvest deny bean pyramid miss"
const INFURA_KEY = "Iw4pUdWfzz9ZxddqpXrS"
// const FACTORY_CONTRACT_ADDRESS = factoryContract
// const NFT_CONTRACT_ADDRESS = "0x12C42ff84eCF88050330d627A61aDb1b62f630D5"
// const OWNER_ADDRESS = ownerAccount
const NETWORK = "rinkeby"
const NUM_BEERS = 1
const DEFAULT_OPTION_ID = 0

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

const FACTORY_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_optionId",
        "type": "uint256"
      },
      {
        "name": "_toAddress",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

// import mint from './mint.js'

export default {
  data () {
    return {
      producKey: '',
      dialog: false,
      OWNER_ADDRESS: '',
      factoryContract: '0x12C42ff84eCF88050330d627A61aDb1b62f630D5',
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
  created () {
    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      console.log('winner');
      this.OWNER_ADDRESS = accounts
    });
  },
  methods: {
    showPortis () {
      portis.showPortis();
    },
    async tryThis () {
      this.$router.push('/all-evidence')
        const provider = portis.provider
        const web3Instance = web3

    if (false) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_BEERS; i++) {
            const result = await nftContract.methods.mintTo(this.OWNER_ADDRESS).send({ from: this.OWNER_ADDRESS });
            console.log("Minted creature. Transaction: " + result.transactionHash)
        }
    } else if (this.factoryContract) {
        const factoryContract = new web3Instance.eth.Contract(FACTORY_ABI, this.factoryContract, { gasLimit: "1000000" })

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_BEERS; i++) {
            const result = await factoryContract.methods.mint(DEFAULT_OPTION_ID, this.OWNER_ADDRESS).send({ from: this.OWNER_ADDRESS });
            console.log("Minted creature. Transaction: " + result.transactionHash)
            
        }

        // Lootboxes issued directly to the owner.
        for (var i = 0; i < NUM_LOOTBOXES; i++) {
            const result = await factoryContract.methods.mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted lootbox. Transaction: " + result.transactionHash)
        }

    
}
    },
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