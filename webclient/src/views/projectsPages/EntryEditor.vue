<template>
  <div>
    <v-app-bar
        color="background"
        elevate-on-scroll
        dense
        scroll-target="#entry-scroll"
        style="z-index: 101"
        >
      <v-toolbar-title>Eintrag</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Delete)" >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary" :title="$t(i18nDictionary.Common.Save)">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Close)" @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" id="entry-scroll">

      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.CategoryEditor.Properties)}}</v-expansion-panel-header>

          <v-expansion-panel-content class="content-with-padding">
            <div class="centered">
              <v-simple-table class="attr-value-table" style="max-width: 500px">
                <tbody>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.Overview.EntriesTable.Key)}}</td>
                  <td>{{initialKey}}</td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.EntryEditor.NewKey)}}</td>
                  <td>
                    <v-text-field
                      type="string"
                      v-model="key"
                      />
                  </td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.Overview.EntriesTable.Category)}}</td>
                  <td>
                    <v-combobox
                      type="string"
                      :items="availableTypes"
                      v-model="category"
                      />
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-expansion-panel-content>

        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.Projects.EntryEditor.Fields)}}</v-expansion-panel-header>
          <v-expansion-panel-content class="content-with-padding">
            <div class="centered">
              <v-simple-table class="attr-value-table" style="max-width: 600px">
                <tbody>
                <tr v-for="(f,i) in fieldNames" :key="'f'+i">
                  <td>{{f}}</td>
                  <td>
                    <v-text-field
                      v-model="fields[i]"
                      type="string"
                      />
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-expansion-panel-content>

        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";
import {BibType, Field} from "../../api/bibTypes/BibType";
import Vue from "vue";

export default Vue.extend({
  name: "EntryEditor",
  props: [
      'layoutBtnContent',
      'index'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
      panels: [0, 1],
      key: '',
      category: '',
      fields: []
    }
  },
  computed: {
    availableTypes(): string[] {
      return this.$store.state.ProjectView.CurrentProjectData.bibTypes.map((t: BibType) => t.Name)
    },
    initialKey(): string {
      return this.index >= 0 ? this.$store.state.ProjectView.CurrentProjectData.bibEntries[this.index].Key : '';
    },
    saveNecessary(): boolean {
      if( this.index === -1 ) {
        return true
      }

      return this.key !== this.$store.state.ProjectView.CurrentProjectData.bibEntries[this.index].Key ||
          this.category !== this.$store.state.ProjectView.CurrentProjectData.bibEntries[this.index].Typ;
    },
    fieldNames(): string[] {
      if( this.category !== '' ) {
        let fields = this.$store.state.ProjectView.CurrentProjectData.bibTypes.find((t: BibType) => t.Name === this.category).Fields.map((f: Field) => f.Field)
        const citeFields = this.$store.state.ProjectView.CurrentProjectData.bibTypes.find((t: BibType) => t.Name === this.category).CiteFields.map((f: Field) => f.Field)
        citeFields.forEach((f: string) => {
          if( fields.indexOf(f) === -1 ) {
            fields.push(f)
          }
        });
        return fields;
      }
      return []
    }
  }
})
</script>

<style scoped>

</style>