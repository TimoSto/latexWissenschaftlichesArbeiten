<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-editor" style="z-index: 100">
      <v-toolbar-title>Literatureintrag: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary" @click="saveEntry">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="closeEditorIfSave">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-editor" class="content-below-two-bars">

      <v-expansion-panels flat tile multiple accordion>

        <v-expansion-panel>
          <v-expansion-panel-header>Allgemein</v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-simple-table disable-sort dense class="two-col-table">
              <tbody>
                <tr>
                  <td>
                    Schlüssel
                  </td>
                  <td>
                    <v-text-field type="string" v-model="entryToEdit.Key"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td>
                    Literaturtyp
                  </td>
                  <td>
                    <v-select
                        v-model="entryToEdit.Typ"
                        :items="$store.state.project.bibTypes.map(bType=>bType.Name)"
                        :menu-props="{ bottom: true, offsetY: true }"
                        type="string"
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-expansion-panel-content>

        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Attribute</v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-simple-table disable-sort dense class="two-col-table">
              <tbody>

              <!--TODO: Wenn genug platz, in zwei spalten-->
                <tr v-for="(attr,i) in fields" :key="attr.Field">
                  <td>
                    {{attr.Field}}
                  </td>
                  <td>
                    <v-text-field
                      v-model="entryToEdit.Fields[i]"
                      type="string"
                      ></v-text-field>
                  </td>
                </tr>

                <tr v-for="(attr,i) in citeFields" :key="attr.Field">
                  <td>
                    {{attr.Field}}
                  </td>
                  <td>
                    <v-text-field
                        v-model="entryToEdit.Fields[i + fields.length]"
                        type="string"
                    ></v-text-field>
                  </td>
                </tr>

              </tbody>
            </v-simple-table>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BibType, Field} from "../api/bibType/BibType";
import {ActionTypes} from "../store/action-types";
import {MutationTypes} from "../store/mutation-types";

export default Vue.extend({
  name: "EntryEditor-View",
  props: [
      'layoutBtnContent'
  ],

  data() {
    return {
      entryToEdit: {
        Key: '',
        Typ: '',
        Fields: [] as string[],
        CiteNumber: 0
      }
    }
  },

  watch: {
    saveNecessary(saveNecessary) {
      this.$store.commit(MutationTypes.EDITOR_SET_SAVELY_CLOSABLE, !saveNecessary);
    }
  },

  mounted() {
    //copy type at indexToEdit from store to data
    this.$nextTick(()=>{
      if( this.$store.state.editor.indexOfEdited >= 0) {
        this.entryToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibEntries[this.$store.state.editor.indexOfEdited]));
      }
    });
  },

  computed: {
    saveNecessary(): boolean {
      if( this.$store.state.editor.indexOfEdited >= 0 ) {
        console.log(this.$store.state.project.bibEntries[this.$store.state.editor.indexOfEdited], this.entryToEdit)
        return JSON.stringify(this.entryToEdit) !== JSON.stringify(this.$store.state.project.bibEntries[this.$store.state.editor.indexOfEdited])
      }
      return true;
    },
    fields(): Field[] {
      let fields = [] as Field[];
      this.$store.state.project.bibTypes.forEach((bType: BibType) => {
        if( bType.Name === this.entryToEdit.Typ ) {
          fields = bType.Fields;
        }
      });
      return fields;
    },
    citeFields(): Field[] {
      let fields = [] as Field[];
      this.$store.state.project.bibTypes.forEach((bType: BibType) => {
        if( bType.Name === this.entryToEdit.Typ ) {
          const fieldsInBib = bType.Fields.map(field => field.Field);
          bType.CiteFields.forEach(field => {
            if ( fieldsInBib.indexOf(field.Field) === -1 ) {
              fields.push(field);
            }
          })
        }
      });
      return fields;
    },
  },

  methods: {
    saveEntry() {
      const obj = {
        Project: this.$store.state.app.currentProjectName,
        InitialKey: this.$store.state.editor.key,
        Entry: this.entryToEdit
      }

      this.$store.dispatch(ActionTypes.EDITOR_SAVE_ENTRY, obj);
    },
    closeEditorIfSave() {
      if( this.$store.state.editor.savelyClosable ) {
        this.$store.commit(MutationTypes.EDITOR_OPEN, {Type: '', Key: ''})
      } else {
        this.$emit('unsafeClose');
      }
    }
  }
})
</script>

<style scoped>

</style>