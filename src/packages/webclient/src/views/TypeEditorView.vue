<template>
  <div>
    <v-app-bar color="background" elevate-on-scroll scroll-target="#scrolling-techniques-7" z-index="100">
      <v-toolbar-title>Literaturtyp: <span class="font-weight-bold">{{this.$store.state.initialType.Name}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!changesToSave">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scrolling-techniques-7">
      <v-container style="height: 120px; padding-top: 30px;">
        <v-row>
          <v-col
              cols="16"
              sm="8"
              md="4"
          >
            <v-text-field v-model="$store.state.typeToEdit.Name" label="Bezeichnung" filled></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-expansion-panels v-model="panel" multiple accordion flat hover tile>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literatureinträge konfigurieren
          </v-expansion-panel-header>
          <v-expansion-panel-content style="padding-top: 8px">
            <p><b>Beispiel:</b> <span v-html="this.$store.state.typeToEdit.Model"></span></p>
            <MyDataTable
                keyprefix="bib"
                :fields="this.$store.state.typeToEdit.Fields"
                v-on:changed="HandleChangeInBibFields"
                v-on:removed="RemoveBibAttr($event)"
                v-on:added="AddBibAttr"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Zitate konfigurieren
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p><b>Beispiel:</b> <span v-html="this.$store.state.typeToEdit.CiteModel"></span></p>
            <MyDataTable
                keyprefix="bib"
                :fields="this.$store.state.typeToEdit.CiteFields"
                v-on:changed="HandleChangeInCiteFields"
                v-on:removed="RemoveCiteAttr($event)"
                v-on:added="AddCiteAttr"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BibType} from "@/api/bibTypes/BibType";
import {MutationTypes} from "@/store/mutation-types";
import MyDataTable from "@/components/MyDataTable.vue";

export default Vue.extend({
  name: "TypeEditor-View",
  components: {MyDataTable},
  props: [
      'name'
  ],

  data() {
    return {
      panel: [0,1],
      headers: [{text: 'Attribut', value: 'Field', width: '25%'}, {text: 'Style', value: 'Style', width: '25%'}, {text: 'Prefix', value: 'Prefix', width: '25%'}, {text: 'Suffix', value: 'Suffix', width: '25%'}, ``],
      fontStyles: [{text: 'normal', value: 'normal'}, {text:'kursiv', value:'italic'}, {text:'fett', value: 'bold'}],
    }
  },

  computed: {
    changesToSave(): boolean {
      return JSON.stringify(this.$store.state.initialType) != JSON.stringify(this.$store.state.typeToEdit)
    },
    // TypeName(): string {
    //   return this.$store.state.typeToEdit.Name
    // },
    // BibType: {
    //   get (): BibType {
    //     return this.$store.state.typeToEdit;
    //   },
    //   set (value: BibType) {
    //     this.$store.commit(MutationTypes.UPDATE_MODEL_FOR_TYPE, this.TypeName)
    //   }
    // }
  },

  methods: {
    HandleChangeInBibFields() {
      this.$store.commit(MutationTypes.UPDATE_MODEL_FOR_TYPE)
    },
    RemoveBibAttr(n: number) {
      this.$store.commit(MutationTypes.RM_BIB_ATTR, n);
      this.$store.commit(MutationTypes.UPDATE_MODEL_FOR_TYPE);
    },
    AddBibAttr() {
      this.$store.commit(MutationTypes.ADD_BIB_ATTR);
    },
    HandleChangeInCiteFields() {
      this.$store.commit(MutationTypes.UPDATE_CITE_MODEL_FOR_TYPE)
    },
    RemoveCiteAttr(n: number) {
      this.$store.commit(MutationTypes.RM_CITE_ATTR, n);
      this.$store.commit(MutationTypes.UPDATE_CITE_MODEL_FOR_TYPE);
    },
    AddCiteAttr() {
      this.$store.commit(MutationTypes.ADD_CITE_ATTR);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/fixesForDark.scss';

.editableTableRow {
  & td {
    padding: 0 8px;
  }
}
</style>