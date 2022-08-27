<template>
  <div>
    <v-app-bar color="background" elevate-on-scroll scroll-target="#scroll3" z-index="100">
      <v-toolbar-title>Literaturtyp: <span class="font-weight-bold">{{this.$store.state.initialEntry.Key}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scroll3">
      <v-container style="height: 120px; padding-top: 30px;">
        <v-row>
          <v-col
              cols="16"
              sm="8"
              md="4"
          >
            <v-text-field v-model="$store.state.entryToEdit.Key" label="ID" filled></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntryEditor-View",
  components: {},

  data() {
    return {
      unsafeClose: false
    }
  },

  computed: {

  },

  methods: {

  },
});
</script>

<style lang="scss" scoped>
@import '../styles/fixesForDark.scss';
</style>