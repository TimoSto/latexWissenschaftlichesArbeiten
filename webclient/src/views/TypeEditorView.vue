<template>
  <div>
    <v-app-bar dense color="background" elecation="1" elevate-on-scroll scroll-target="#scroll-editor">
      <v-toolbar-title>Literaturtyp: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary">
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
                    <v-text-field type="string" v-model="$store.state.editor.typeToEdit.Name" :rules="nameRules"/>
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
                      v-model="$store.state.editor.typeToEdit.CitaviType"
                      @blur="citaviPrefix = ($store.state.editor.typeToEdit.CitaviType && $store.state.editor.typeToEdit.CitaviType.length > 0) ? '@' : ''"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  Citavi-Pflichtfelder
                </td>
                <td>
                  <v-combobox
                      v-model="$store.state.editor.typeToEdit.CitaviNecessaryFields"
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
                      >(+{{ $store.state.editor.typeToEdit.CitaviNecessaryFields.length - 4 }})</span>
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

            <MyDataTable
                keyprefix="bib"
                :fields="$store.state.editor.typeToEdit.Fields"
                show-citavi-attrs="true"
                v-on:changed="HandleChangeInFields"
                v-on:removed="RmBibAttr($event)"
                v-on:added="AddBibAttr"
            ></MyDataTable>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Zitate</v-expansion-panel-header>
          <v-expansion-panel-content>

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
      focusedComboCitavi: false
    }
  },

  computed: {
    saveNecessary(): boolean {
      for( let i = 0 ; i < this.$store.state.project.bibTypes.length ; i++ ) {
        if( this.$store.state.project.bibTypes[i].Name === this.$store.state.editor.key ) {
          return JSON.stringify(this.$store.state.project.bibTypes[i]) !== JSON.stringify(this.$store.state.editor.typeToEdit)
        }
      }
      console.warn('type not found')
      return false
    }
  },

  methods: {
    HandleChangeInFields() {
      this.$store.commit(MutationTypes.EDITOR_TYPE_UPDATE_MODELS);
    },
    AddBibAttr() {
      this.$store.commit(MutationTypes.EDITOR_TYPE_ADD_FIELD, false)
    },
    RmBibAttr(evt: any) {
      this.$store.commit(MutationTypes.EDITOR_TYPE_RM_FIELD, {cite: false, index: evt})
    }
  }
})
</script>

<style scoped lang="scss">
.two-col-table {
  max-width: 450px;
  border-bottom: 1px solid rgba(128,128,128, 0.25);
  border-top: 1px solid rgba(128,128,128, 0.25);
  & tr {
    & td:first-child {
      width: 150px;
    }
  }
}
</style>