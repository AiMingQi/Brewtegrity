<template lang="pug">
  v-card.pa-3
    h1 Brewery Information
    v-form(
      ref="form"
      v-model="valid"
      lazy-validation
    )
      //- v-select(
      //-   :items="ways"
      //-   label="5 Ways"
      //-   v-model="evidence_way"
      //-   required
      //- )
      v-text-field(
        v-model="evidence_title"
        :rules="evidence_titleRules"
        label="Smart Contract Address"
        required
      )
      v-text-field(
        v-model="evidence_title"
        :rules="evidence_titleRules"
        label="Beer Name"
        required
      )
      v-text-field(
        v-model="evidence_body"
        :rules="evidence_titleRules"
        label="Brewery"
        required
      )
      v-text-field(
        v-model="evidence_tip"
        :rules="evidence_titleRules"
        label="Brewer"
      )
      h3 Brew Date
      v-date-picker(
        v-model="evidence_link"
        label="Brew Date"
        landscape
        required
      )
      v-card.pa-3(light)
        h2 Ingredients - What is in your Beer
        v-select(
          :items="types"
          label="Brewed with Brewtegrity®"
          v-model="evidence_type"
          required
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Hops"
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Grain"
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Yeast"
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Water"
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Adjuncts"
        )
        v-text-field(
          v-model="evidence_tip"
          :rules="evidence_titleRules"
          label="Additives"
        )
      v-btn(
        :disabled="!valid"
        @click="submitEvidence"
      ) Submit
      v-btn(@click="clear") clear



</template>

<script>
import { store } from '../store';
import 'firebase/auth';

export default {
  data: () => ({
    types: [
      'Undisclosed',
      'Yes',
      'No'
    ],
    evidence_way: '',
    valid: true,
    evidence_title: '',
    evidence_titleRules: [
      v => !!v || 'Entry is required',
      v => (v && v.length <= 100) || 'Entry must be less than 100 characters'
    ],
    evidence_body: '',
    evidence_bodyRules: [
      v => !!v || 'Description is required',
      v => (v && v.length <= 600) || 'Description must be less than 600 characters'
    ],
    evidence_link: '',
    evidence_linkRules: [
      v => !!v || 'Link to Proof is required',
      v => (v && v.length <= 180) || 'Link must be less than 180 characters'
    ],
    evidence_tip: '',
    evidence_tipRules: [
      v => (v && v.length <= 300) || 'Link must be less than 300 characters'
    ]
  }),
  methods: {
    submitEvidence () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        store.writeBeerBatch(this.newBeerBatch);
        // console.log('trying to send')
        // console.log(this.newEvidence)
        this.$refs.form.reset()
        this.$router.push('/all-evidence')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
  newEvidence () {
    return {
      evidence_title: this.evidence_title,
      evidence_body: this.evidence_body,
      evidence_link: this.evidence_link,
      evidence_way: this.evidence_way,
      evidence_type: this.evidence_type,
      evidence_tip: this.evidence_tip
    }
  }
}
}
</script>

