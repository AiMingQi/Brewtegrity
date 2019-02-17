<template lang="pug">
  v-content
    v-layout
      v-flex
        v-card
          v-card-title
            v-img.ma-2(src="/mark.png" max-height="80px" max-width="80px")
            h1 What's in your Beer?
          v-card-text
            h2 Brewery Information
            h3.primary--text 1. Beer Name
            p American Bold
            h3.primary--text 2. Brewery Name
            p Vindication
            h3.primary--text 3. Brewer
            p Eric Huber
            h3.primary--text 4. Brew Date
            p February 17, 2019
            h3.primary--text 5. Ethereum Address where the Smart Contract is Deployed
            a(href="https://rinkeby.etherscan.io/address/0x12C42ff84eCF88050330d627A61aDb1b62f630D5") 0x12C42ff84eCF88050330d627A61aDb1b62f630D5
        
        v-card(light)
          v-card-title
            h1 Ingredients - What is in the Beer
          v-card-text
            h3 This Brew Has 
            v-img(src="banner-logo-bt.png" contain width="40%")
            h3.primary--text 1. Hops
            p Calypso
            h3.primary--text 2. Grain
            p Barley
            h3.primary--text 3. Yeast
            p Imperial Yeast A38 Juice
            h3.primary--text 4. Water
            p Denver Watershed
            h3.primary--text 5. Adjuncts
            p none
            h3.primary--text 6. Additives
            p none

</template>
 