<template>
  <div>
    <v-app-bar dense color="primary" elecation="1" elevate-on-scroll>
      <v-toolbar-title>Literaturtyp</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TypeEditor-View",
  props: [
      'projectName'
  ],

  computed: {
    layoutBtnContent() {
      if( this.$store.state.app.twoThirdsActive ) {
        return [
          '&#189;',
          'Wechsel zu 50:50-Layout'
        ]
      }
      return [
        '&#8532;',
        'Wechsel zu 70:30-Layout'
      ]
    },
  }
})
</script>

<style scoped>

</style>