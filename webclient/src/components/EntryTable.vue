<template>
  <div class="centered">
    <v-simple-table style="max-width: 800px">
      <template v-slot:default>
        <CustomTableHead
            :headers="headers"
            :actions="actions" />

        <tbody>
        <tr v-for="e in entries" :key="e.Key" @click="$emit('select', e.Key)" style="cursor: pointer" v-ripple>
          <td>{{e.Key}}</td>
          <td>{{e.Typ}}</td>
          <td v-html="e.BibPreview"></td>
          <td style="text-align: center">{{e.CiteNumber}}</td>
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
import {BibEntry} from "../api/bibEntries/Entry";
import CustomTableHead, {TableAction} from "./CustomTableHead.vue";

export default Vue.extend({
  name: "EntryTable",
  components: {CustomTableHead},
  props: {
    entries: [] as unknown as () => BibEntry[],
    actions: [] as unknown as () => TableAction[],
  },

  data() {
    return {
      i18nDictionary: i18nDictionary,
      headers: [
        {Text: this.$t(i18nDictionary.Projects.Overview.EntriesTable.Key)},
        {Text: this.$t(i18nDictionary.Projects.Overview.EntriesTable.Category)},
        {Text: this.$t(i18nDictionary.Projects.Overview.EntriesTable.Entry)},
        {Text: this.$t(i18nDictionary.Projects.Overview.EntriesTable.CiteCount), Centered: true}
      ]
    }
  }
})
</script>

<style scoped>

</style>