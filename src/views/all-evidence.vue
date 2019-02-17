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

</template>
 