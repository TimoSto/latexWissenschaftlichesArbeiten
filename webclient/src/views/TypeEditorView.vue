<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-editor" style="z-index: 100">
      <v-toolbar-title>Literaturtyp: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary" @click="saveType">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-editor" class="content-below-two-bars">

      <v-expansion-panels multiple accordion flat tile>

        <v-expansion-panel>
          <v-expansion-panel-header>Allgemein</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-simple-table disable-sort dense class="two-col-table">
              <tbody>
                <tr>
                  <td>
                    Bezeichnung
                  </td>
                  <td style="text-align: right">
                    <v-text-field type="string" v-model="typeToEdit.Name" :rules="nameRules"/>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Citavi-Import</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-simple-table disable-sort dense class="two-col-table">
              <tbody>
              <tr>
                <td>
                  Citavi-Typ
                </td>
                <td>
                  <v-text-field
                      :prefix="citaviPrefix"
                      placeholder="Citavi-Typ"
                      type="string"
                      v-model="typeToEdit.CitaviType"
                      @blur="citaviPrefix = (typeToEdit.CitaviType && typeToEdit.CitaviType.length > 0) ? '@' : ''"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  Citavi-Pflichtfelder
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

          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Literaturverzeichnis</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="preview-area">
              <p v-html="typeToEdit.Model"></p>
            </div>

            <MyDataTable
                keyprefix="bib"
                :fields="typeToEdit.Fields"
                show-citavi-attrs="true"
                v-on:changed="HandleChangeInFields"
                v-on:removed="RmAttr($event, false)"
                v-on:added="AddAttr(false)"
            ></MyDataTable>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Zitate</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="preview-area">
              <p v-html="typeToEdit.CiteModel"></p>
            </div>

            <MyDataTable
                keyprefix="bib"
                :fields="typeToEdit.CiteFields"
                show-citavi-attrs="true"
                v-on:changed="HandleChangeInFields"
                v-on:removed="RmAttr($event, true)"
                v-on:added="AddAttr(true)"
            ></MyDataTable>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MyDataTable from "../components/MyDataTable.vue";
import {MutationTypes} from "../store/mutation-types";
import {ActionTypes} from "../store/action-types";
import {BibType, CreateField, Field} from "../api/bibType/BibType";

export default Vue.extend({
  name: "TypeEditor-View",
  components: {MyDataTable},
  props: [
      'projectName',
      'layoutBtnContent'
  ],

  data() {
    return {
      nameRules: [
        (value: any) => !!value || 'Pflichtfeld',
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
    }
  },

  mounted() {
    //copy type at indexToEdit from store to data
    this.$nextTick(()=>{
      this.typeToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibTypes[this.$store.state.editor.indexOfEdited]));

    });
  },

  computed: {
    saveNecessary(): boolean {

      console.log(this.$store.state.project.bibTypes[this.$store.state.editor.indexOfEdited] , this.typeToEdit)
      return JSON.stringify(this.$store.state.project.bibTypes[this.$store.state.editor.indexOfEdited]) !== JSON.stringify(this.typeToEdit)
    }
  },

  methods: {
    HandleChangeInFields() {
      this.$store.commit(MutationTypes.EDITOR_TYPE_UPDATE_MODELS);
    },
    AddAttr(cite: boolean) {
      if( cite ) {
        this.typeToEdit.CiteFields.push(CreateField('', 'normal', '', ''))
      } else {
        this.typeToEdit.Fields.push(CreateField('', 'normal', '', ''))
      }
    },
    RmAttr(evt: any, cite: boolean) {
      if( cite ) {
        this.typeToEdit.CiteFields.splice(evt, 1)
      } else {
        this.typeToEdit.Fields.splice(evt, 1)
      }
    },
    saveType() {
      // const obj = {
      //   Type: this.$store.state.editor.typeToEdit,
      //   Project: this.$store.state.app.currentProjectName,
      //   InitialName: this.$store.state.editor.key
      // }
      //
      // this.$store.dispatch(ActionTypes.EDITOR_SAVE_TYPE, obj)

    }
  }
})
</script>

<style scoped lang="scss">

</style>