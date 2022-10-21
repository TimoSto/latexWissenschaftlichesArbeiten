<template>
  <div class="centered">
    <v-simple-table style="max-width: 800px">
      <template v-slot:default>
        <CustomTableHead
            :headers="headers"
            :actions="actions" />

        <tbody>
        <tr v-for="(t, i) in types" :key="t.Name" style="cursor: pointer" v-ripple @click="$emit('select', i)">
          <td>{{t.Name}}</td>
          <td>{{t.CitaviType}}</td>
          <td v-html="t.Model"></td>
          <td></td>
        </tr>
        </tbody>
      </template>

    </v-simple-table>
  </div>
  <!--TODO: pagination -->
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import {BibType} from "../api/bibTypes/BibType";
import CustomTableHead, {TableAction} from "./CustomTableHead.vue";

export default Vue.extend({
  name: "TypesTable",
  components: {CustomTableHead},
  props: {
    types: [] as unknown as () => BibType[],
    actions: [] as unknown as () => TableAction[],
  },

  data() {
    return {
      i18nDictionary: i18nDictionary,
      headers: [
        {Text: this.$t(i18nDictionary.Projects.Overview.TypesTable.Name)},
        {Text: this.$t(i18nDictionary.Projects.Overview.TypesTable.CitaviType)},
        {Text: this.$t(i18nDictionary.Projects.Overview.TypesTable.EntryExample)},
      ]
    }
  }
})
</script>

<style scoped>

</style>