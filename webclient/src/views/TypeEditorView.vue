<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-editor" style="z-index: 100">
      <v-toolbar-title>Literaturtyp: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary || !neededFields" @click="saveType">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="triggerDeleteType" :disabled="$store.state.editor.key.length === 0">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="closeEditorIfSave">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-editor" class="content-below-two-bars">

      <v-expansion-panels multiple accordion flat tile>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.COMMON_GENERAL)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="centered">
              <v-simple-table disable-sort dense class="two-col-table" style="max-width: 500px">
                <tbody>
                <tr>
                  <td>
                    {{$t(i18nDictionary.TYPE_EDITOR_NAME)}}
                  </td>
                  <td style="text-align: right" @input="checkNeededFields">
                    <v-text-field type="string" v-model="typeToEdit.Name" :rules="nameRules"/>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.TYPE_EDITOR_CITAVI_IMPORT)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="centered">
              <v-simple-table disable-sort dense class="two-col-table" style="max-width: 500px">
                <tbody>
                <tr>
                  <td>
                    {{$t(i18nDictionary.TYPE_EDITOR_CITAVI_TYPE)}}
                  </td>
                  <td>
                    <v-text-field
                        :prefix="citaviPrefix"
                        :placeholder="$t(i18nDictionary.TYPE_EDITOR_CITAVI_TYPE)"
                        type="string"
                        v-model="typeToEdit.CitaviType"
                        @blur="citaviPrefix = (typeToEdit.CitaviType && typeToEdit.CitaviType.length > 0) ? '@' : ''"
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    {{$t(i18nDictionary.TYPE_EDITOR_CITAVI_MANDATORY_FIELDS)}}
                  </td>
                  <td>
                    <v-combobox
                        v-model="typeToEdit.CitaviNecessaryFields"
                        multiple
                        :items="['doi', 'url']"
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
                        >(+{{ typeToEdit.CitaviNecessaryFields.length - 4 }})</span>
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
          <v-expansion-panel-header>{{$t(i18nDictionary.TYPE_EDITOR_BIBLIOGRAPHY_ENTRY)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="centered">
              <div class="preview-area">
                <p v-html="typeToEdit.Model"></p>
              </div>

              <MyDataTable
                  keyprefix="bib"
                  :fields="typeToEdit.Fields"
                  show-citavi-attrs="true"
                  v-on:changed="UpdateModels"
                  v-on:removed="RmAttr($event, false)"
                  v-on:added="AddAttr(false)"
                  style="max-width: 1200px;"
              ></MyDataTable>
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.TYPE_EDITOR_CITE)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="centered">
              <div class="preview-area">
                <p v-html="typeToEdit.CiteModel"></p>
              </div>

              <MyDataTable
                  keyprefix="bib"
                  :fields="typeToEdit.CiteFields"
                  show-citavi-attrs="true"
                  v-on:changed="UpdateModels"
                  v-on:removed="RmAttr($event, true)"
                  v-on:added="AddAttr(true)"
                  style="max-width: 1200px"
                  :showCitaviAttrs="false"
              ></MyDataTable>
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>

    <ConfirmDialog
        :model="deleteTriggered"
        :title="$t(i18nDictionary.DELETE_TYPE_SURE_TITLE)"
        :content="$t(i18nDictionary.DELETE_TYPE_SURE_CONTENT).replace('%s', $store.state.editor.key)"
        :action="$t(i18nDictionary.DELETE)"
        :abort="$t(i18nDictionary.ABORT)"
        @declined="deleteTriggered = false"
        @confirmed="deleteType"
    />

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MyDataTable from "../components/MyDataTable.vue";
import {MutationTypes} from "../store/mutation-types";
import {ActionTypes} from "../store/action-types";
import {CreateField, Field} from "../api/bibType/BibType";
import {GenerateModelForBibType} from "../api/bibType/GenerateModelForBibTypes";
import {i18nDictionary} from "../i18n/Keys";
import ConfirmDialog from "../components/ConfirmDialog.vue";

export default Vue.extend({
  name: "TypeEditor-View",
  components: {ConfirmDialog, MyDataTable},
  props: [
      'projectName',
      'layoutBtnContent'
  ],

  data() {
    return {
      nameRules: [
        (value: string) => !!value || 'Pflichtfeld',
      ],
      citaviPrefix: '',
      focusedComboCitavi: false,
      typeToEdit: {
        Name: '',
        Fields: [] as Field[],
        CiteFields: [] as Field[],
        CitaviType: '',
        CitaviNecessaryFields: [] as string[],
        Model: '',
        CiteModel: ''
      },
      deleteTriggered: false,
      i18nDictionary: i18nDictionary,
      neededFields: true
    }
  },

  mounted() {
    //copy type at indexToEdit from store to data
    this.$nextTick(()=>{
      if( this.$store.state.editor.indexOfEdited >= 0) {
        this.typeToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibTypes[this.$store.state.editor.indexOfEdited]));
      } else {
        //bei neuem typen sind die felder noch nicht eingetragen
        this.neededFields = false;
      }
    });
  },

  watch: {
    saveNecessary(saveNecessary) {
      this.$store.commit(MutationTypes.EDITOR_SET_SAVELY_CLOSABLE, !saveNecessary);
    },
    indexOfEdited(i) {
      if( i > -1 ) {
        this.typeToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibTypes[i]));
      } else {
        this.typeToEdit = {
          Name: '',
          CitaviType: '',
          CitaviNecessaryFields: [],
          Fields: [],
          CiteFields: [],
          Model: '',
          CiteModel: ''
        }
      }
    }
  },

  computed: {
    saveNecessary(): boolean {
      //
      if( this.$store.state.editor.indexOfEdited >= 0) {
        return JSON.stringify(this.$store.state.project.bibTypes[this.$store.state.editor.indexOfEdited]) !== JSON.stringify(this.typeToEdit)
      }

      return this.typeToEdit.Name !== '' || this.typeToEdit.CitaviType !== '' || this.typeToEdit.CitaviNecessaryFields.length > 0 ||
          this.typeToEdit.Fields.length > 0 || this.typeToEdit.CiteFields.length > 0
    },
    indexOfEdited(): number {
      return this.$store.state.editor.indexOfEdited;
    }
  },

  methods: {
    UpdateModels() {
      this.typeToEdit.Model = GenerateModelForBibType(this.typeToEdit.Fields);
      this.typeToEdit.CiteModel = GenerateModelForBibType(this.typeToEdit.CiteFields);
    },
    AddAttr(cite: boolean) {
      if( cite ) {
        this.typeToEdit.CiteFields.push(CreateField('', 'normal', '', ''))
      } else {
        this.typeToEdit.Fields.push(CreateField('', 'normal', '', ''))
      }
      this.UpdateModels();
    },
    RmAttr(evt: number, cite: boolean) {
      if( cite ) {
        this.typeToEdit.CiteFields.splice(evt, 1)
      } else {
        this.typeToEdit.Fields.splice(evt, 1)
      }
      this.UpdateModels();
    },
    saveType() {
      const obj = {
        Type: this.typeToEdit,
        Project: this.$store.state.app.currentProjectName,
        InitialName: this.$store.state.editor.key
      }

      this.$store.dispatch(ActionTypes.EDITOR_SAVE_TYPE, obj)

    },
    closeEditorIfSave() {
      if( this.$store.state.editor.savelyClosable ) {
        this.$store.commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''})
      } else {
        this.$emit('unsafeClose');
      }
    },
    triggerDeleteType() {
      this.deleteTriggered = true;
    },
    deleteType() {
      this.$store.dispatch(ActionTypes.EDITOR_DELETE_TYPE, {Project: this.$store.state.app.currentProjectName, Key: this.$store.state.editor.key});
    },
    checkNeededFields() {
      if(this.typeToEdit.Name.length === 0) {
        this.neededFields = false;
      }  else {
        this.neededFields = true;
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>