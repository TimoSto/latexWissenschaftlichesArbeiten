<template>
  <div>
    <v-app-bar
        color="background"
        elevate-on-scroll
        scroll-target="#category-editor-scroll"
        dense
        style="z-index: 102"
        >
      <v-toolbar-title>{{$t(i18nDictionary.Projects.CategoryEditor.Title)}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Delete)" @click="deleteOpen = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary || !rulesAreMet" :title="$t(i18nDictionary.Common.Save)" @click="saveThisCategory">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Close)" @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" id="category-editor-scroll">

      <v-expansion-panels tile flat hover multiple v-model="panels">

        <v-expansion-panel>
          <v-expansion-panel-header>
            {{$t(i18nDictionary.Projects.CategoryEditor.Properties)}}
          </v-expansion-panel-header>

          <v-expansion-panel-content class="content-with-padding">
            <div class="centered">
              <v-simple-table class="attr-value-table" style="max-width: 500px">
                <tbody>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.InitialName)}}</td>
                  <td style="font-style: italic">{{initialName}}</td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.Name)}}</td>
                  <td>
                    <v-text-field
                        type="string"
                        v-model="name"
                        :rules="typeNameRules"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.CitaviCategory)}}</td>
                  <td>
                    <v-combobox
                        v-model="citaviCategory"
                        :items="citaviTypes"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.CitaviNecessaryFields)}}</td>
                  <td>
                    <v-combobox
                        v-model="citaviNecessaryFields"
                        multiple
                        :items="citaviMandatoryAttributes"
                        @focus="focusedComboCitavi=true"
                        @blur="focusedComboCitavi=false"
                    >
                      <!--to have no checkbox-->
                      <template v-slot:item="{ item }">
                        {{item}}
                      </template>
                      <!--to only show 4 in unfocused state -->
                      <template v-slot:selection="{ item, index }" v-if="!focusedComboCitavi">
                        <span v-if="index < 4">{{ item }} &nbsp;</span>
                        <span
                            v-if="index === 4"
                            class="grey--text caption"
                        >(+{{ citaviNecessaryFields.length - 4 }})</span>
                      </template>

                    </v-combobox>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-expansion-panel-content>

        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            {{$t(i18nDictionary.Projects.CategoryEditor.BibliographyEntry)}}
          </v-expansion-panel-header>

          <v-expansion-panel-content class="content-with-padding">

            <p v-html="bibModel"></p>

            <CategoryTable
                keyprefix="bib"
                :fields="fields"
                show-citavi-attrs="true"
                style="max-width: 1200px;"
                v-on:added="addAttribute(false)"
                v-on:removed="removeAttribute($event, false)"
                ref="bibTable"
            ></CategoryTable>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            {{$t(i18nDictionary.Projects.CategoryEditor.Cite)}}
          </v-expansion-panel-header>

          <v-expansion-panel-content class="content-with-padding">

            <p v-html="citeModel"></p>

            <CategoryTable
                keyprefix="cite"
                :fields="citeFields"
                show-citavi-attrs="false"
                style="max-width: 1100px;"
                v-on:added="addAttribute(true)"
                v-on:removed="removeAttribute($event, true)"
            ></CategoryTable>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-sheet>

    <ConfirmDialog
      :open="deleteOpen"
      :abort="$t(i18nDictionary.Common.Abort)"
      :confirm="$t(i18nDictionary.Common.Delete)"
      :title="$t(i18nDictionary.Projects.CategoryEditor.DeleteCategoryDialog.Title)"
      :content="$t(i18nDictionary.Projects.CategoryEditor.DeleteCategoryDialog.Content)"
      v-on:discard="deleteOpen = false"
      v-on:confirm="deleteThisCategory"
       />

  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";
import Vue from "vue";
import {Field} from "../../api/bibTypes/BibType";
import CategoryTable from "../../components/CategoryTable.vue";
import {GenerateModelFromFields} from "../../api/bibTypes/GenerateModelFromFields";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import ActionTypes from "../../store/ActionTypes";
import GetTypeNameRules from "../../inputRules/typeNameRules"

export default Vue.extend({
  name: "CategoryEditor",
  components: {ConfirmDialog, CategoryTable},
  props: [
      'layoutBtnContent',
      'index'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
      name: '',
      citaviCategory: '',
      citaviNecessaryFields: [] as string[],
      fields: [] as Field[],
      citeFields: [] as Field[],
      deleteOpen: false,
      panels: [0,1,2],
      citaviTypes: [
          'article',
          'proceedings',
          'book',
          'collection',
          'inproceedings',
          'inbook',
          'incollection'
      ],
      //TODO: check if these are used in fields
      citaviMandatoryAttributes: [
          'doi',
          'url'
      ],
      focusedComboCitavi: false
    }
  },
  computed: {
    initialName(): string {
      return this.index >= 0 ? this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].Name : '';
    },
    saveNecessary(): boolean {//todo: rules checken

      if ( this.index === -1 ) {
        return true
      }

      return this.name !== this.initialName ||
          this.citaviCategory !== this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CitaviType ||
          JSON.stringify(this.citaviNecessaryFields) !== JSON.stringify(this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CitaviNecessaryFields) ||
          JSON.stringify(this.fields) !== JSON.stringify(this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].Fields) ||
          JSON.stringify(this.citeFields) !== JSON.stringify(this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CiteFields);
    },
    rulesAreMet(): boolean {
      //todo: rules are met from table
      return this.typeNameRules[0](this.name) === true
    },
    bibModel(): string {
      return GenerateModelFromFields(this.fields);
    },
    citeModel(): string {
      return GenerateModelFromFields(this.citeFields);
    },
    typeNameRules() {
      const translator = (v: string) => {
        return this.$t(v)
      }
      return GetTypeNameRules(this.$store.state.ProjectView.CurrentProjectData.bibTypes,
          this.index >= 0 ? this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].Name : '',
          translator)
    }
  },
  watch: {
    index() {
      this.setTypeToEdit();
    },
    citaviCategory(nv) {
      if( !nv ) {
        this.citaviCategory = '';
      }
    },
    citaviNecessaryFields(nv) {
      if( !nv ) {
        this.citaviNecessaryFields = [];
      }
    }
  },
  mounted() {
    if( this.index >= 0 ) {
      this.setTypeToEdit();
    }
  },
  methods: {
    setTypeToEdit() {
      if( this.index >= 0 ) {
        this.name = this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].Name;
        this.citaviCategory = this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CitaviType;
        this.citaviNecessaryFields = this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CitaviNecessaryFields;
        this.fields = JSON.parse( JSON.stringify(this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].Fields) );
        this.citeFields = JSON.parse( JSON.stringify(this.$store.state.ProjectView.CurrentProjectData.bibTypes[this.index].CiteFields) );
      } else {
        this.name = '';
        this.citaviCategory = '';
        this.citaviNecessaryFields = [];
        this.fields = [];
        this.citeFields = [];
      }
    },
    addAttribute(cite: boolean) {
      if( cite ) {
        this.citeFields.push({
          Field: '',
          Style: 'normal',
          Prefix: '',
          Suffix: '',
          TexValue: false,
          CitaviAttributes: []
        });
      } else {
        this.fields.push({
          Field: '',
          Style: 'normal',
          Prefix: '',
          Suffix: '',
          TexValue: false,
          CitaviAttributes: []
        });
      }
    },
    removeAttribute(n: number, cite: boolean) {
      if( cite ) {
        this.citeFields.splice(n, 1);
      } else {
        this.fields.splice(n, 1);
      }
    },
    deleteThisCategory() {
      this.deleteOpen = false;

      this.$store.dispatch(ActionTypes.Projects.CategoryEditor.DeleteCategory, {
        project: this.$store.state.ProjectView.CurrentProject,
        type: this.initialName
      });
    },
    saveThisCategory() {
      this.$store.dispatch(ActionTypes.Projects.CategoryEditor.SaveCategory, {
        type: {
          Name: this.name,
          Fields: this.fields,
          CiteFields: this.citeFields,
          CitaviType: this.citaviCategory,
          CitaviNecessaryFields: this.citaviNecessaryFields,
          Model: this.bibModel,
          CiteModel: this.citeModel
        },
        project: this.$store.state.ProjectView.CurrentProject,
        initialName: this.initialName
      })
    }
  }
})
</script>

<style lang="scss">
@use "@/styles/tableClasses.scss";

.menuable__content__active {
  z-index: 200!important;
}

</style>