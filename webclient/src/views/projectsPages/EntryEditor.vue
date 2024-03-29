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

      <v-btn icon :disabled="!saveNecessary || !rulesAreMet" :title="$t(i18nDictionary.Common.Save)" @click="saveThisEntry">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-menu :offset-y="true">
        <template v-slot:activator="{on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :title="$t(i18nDictionary.Common.Delete)" @click="deleteOpen = true">
            <v-list-item-icon>
              <v-icon>mdi-delete</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$t(i18nDictionary.Common.Delete)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>

      <span style="border-left: 1px solid rgba(0,0,0,0.1)">
        <v-btn icon :title="$t(i18nDictionary.Common.Close)" @click="$emit('closeEditor')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </span>
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
                      :rules="keyRules"
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
                <!--todo: gehts croll auch ohne head -->
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

    <ConfirmDialog
        :open="deleteOpen"
        :abort="$t(i18nDictionary.Common.Abort)"
        :confirm="$t(i18nDictionary.Common.Delete)"
        :title="$t(i18nDictionary.Projects.EntryEditor.DeleteEntryDialog.Title)"
        :content="$t(i18nDictionary.Projects.EntryEditor.DeleteEntryDialog.Content)"
        v-on:discard="deleteOpen = false"
        v-on:confirm="deleteThisType"
    />

  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";
import {BibType} from "../../api/bibTypes/BibType";
import Vue from "vue";
import ActionTypes from "../../store/ActionTypes";
import GeneratePreviewsForBibEntry from "../../api/bibEntries/GeneratePreviewsForBibEntry";
import { GetEntryKeyRules } from "@/inputRules/entryKeyRules";
import EntrySaveNecessary from "../../saveNecessary/entrySaveNecessary";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import GetFieldNames from "../../api/bibEntries/GetFieldNames";
import {ParseStringToTeX} from "../../api/bibEntries/ParseTeXString";

export default Vue.extend({
  name: "EntryEditor",
  components: {ConfirmDialog},
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
      fields: [],
      deleteOpen: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setData();
    })
  },
  watch: {
    index() {
      this.setData();
    },
    saveNecessary(v: boolean) {
      this.$emit('closable', !v);
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

      return EntrySaveNecessary(this.$store.state, this.index, this.key, this.category, this.fields)
    },
    fieldNames(): string[] {

      return GetFieldNames(this.$store.state, this.category)
    },
    preview(): string[] {
      const btype = this.$store.state.ProjectView.CurrentProjectData.bibTypes.find((t: BibType) => t.Name === this.category)
      return GeneratePreviewsForBibEntry(btype.Fields, btype.CiteFields, this.fields)
    },
    keyRules(): ((v: string) => boolean | string)[] {
      const translate = (v: string) => {
        return this.$t(v)
      }
      return GetEntryKeyRules(this.index, this.$store.state.ProjectView.CurrentProjectData.bibEntries, translate)
    },
    rulesAreMet(): boolean {
      return this.keyRules[0](this.key) === true && this.category.length > 0
    }
  },
  methods: {
    saveThisEntry() {
      let parsedFields = [] as string[];
      this.fields.forEach(f => {
        parsedFields.push(ParseStringToTeX(f))
      })
      this.$store.dispatch(ActionTypes.Projects.EntryEditor.SaveEntry, {
        initialKey: this.initialKey,
        project: this.$store.state.ProjectView.CurrentProject,
        entry: {
          Key: this.key,
          Typ: this.category,
          Fields: parsedFields,
          BibPreview: this.preview[0],
          CitePreview: this.preview[1]
        }
      })
    },
    setData() {
      if( this.index >= 0 ) {
        const entry = this.$store.state.ProjectView.CurrentProjectData.bibEntries[this.index];
        this.key = entry.Key;
        this.category = entry.Typ;
        this.fields = JSON.parse(JSON.stringify(entry.Fields)).map((s: string) => {
          if( !s ) return ''
          return s
        });
      } else {
        this.key = '';
        this.category = '';
        this.fields = [];
      }
    },
    deleteThisType() {
      this.$store.dispatch(ActionTypes.Projects.EntryEditor.DeleteEntry, {project: this.$store.state.ProjectView.CurrentProject, entry: this.initialKey})
    }
  }
})
</script>

<style scoped>

</style>