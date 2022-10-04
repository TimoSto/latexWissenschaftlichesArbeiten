<template>
  <div>
    <v-app-bar dense color="background" elevation="1" elevate-on-scroll scroll-target="#scroll-editor" style="z-index: 100">
      <v-toolbar-title>Literatureintrag: <i>{{$store.state.editor.key}}</i></v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :disabled="!saveNecessary || !neededFields" @click="saveEntry">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="triggerDeleteEntry" :disabled="$store.state.editor.key.length === 0">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="closeEditorIfSave">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-sheet id="scroll-editor" class="content-below-two-bars">

      <v-expansion-panels flat tile multiple accordion style="max-width: 650px">

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.COMMON_GENERAL)}}</v-expansion-panel-header>

          <v-expansion-panel-content>
              <div class="centered">
                <v-simple-table disable-sort dense class="two-col-table">
                  <tbody>
                  <tr>
                    <td>
                      {{$t(i18nDictionary.ENTRY_EDITOR_KEY)}}
                    </td>
                    <td>
                      <v-text-field type="string" v-model="entryToEdit.Key" :rules="nameRules" @input="checkNeededFields"></v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {{$t(i18nDictionary.COMMON_BIB_TYPE)}}
                    </td>
                    <td>
                      <v-select
                          v-model="entryToEdit.Typ"
                          :items="$store.state.project.bibTypes.map(bType=>bType.Name)"
                          :menu-props="{ bottom: true, offsetY: true }"
                          :rules="nameRules"
                          type="string"
                          @input="checkNeededFields"
                      ></v-select>
                    </td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </div>
          </v-expansion-panel-content>

        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{$t(i18nDictionary.ENTRY_EDITOR_ATTRIBUTES)}}</v-expansion-panel-header>
          <v-expansion-panel-content>

            <div class="centered">
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
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-sheet>

    <ConfirmDialog
        :model="deleteTriggered"
        :title="$t(i18nDictionary.DELETE_ENTRY_SURE_TITLE)"
        :content="$t(i18nDictionary.DELETE_ENTRY_SURE_CONTENT).replace('%s', $store.state.editor.key)"
        :action="$t(i18nDictionary.DELETE)"
        :abort="$t(i18nDictionary.ABORT)"
        @declined="deleteTriggered = false"
        @confirmed="deleteEntry"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BibType, Field} from "../api/bibType/BibType";
import {ActionTypes} from "../store/action-types";
import {MutationTypes} from "../store/mutation-types";
import {i18nDictionary} from "../i18n/Keys";
import ConfirmDialog from "../components/ConfirmDialog.vue";

export default Vue.extend({
  name: "EntryEditor-View",
  props: [
      'layoutBtnContent'
  ],
  components: {ConfirmDialog},

  data() {
    return {
      entryToEdit: {
        Key: '',
        Typ: '',
        Fields: [] as string[],
        CiteNumber: 0
      },
      deleteTriggered: false,
      i18nDictionary: i18nDictionary,
      nameRules: [
        (value: any) => !!value || this.$t(this.$data.i18nDictionary.COMMON_MANDATORY_FIELD),
      ],
      neededFields: true
    }
  },

  watch: {
    saveNecessary(saveNecessary) {
      this.$store.commit(MutationTypes.EDITOR_SET_SAVELY_CLOSABLE, !saveNecessary);
    },
    indexOfEdited(i) {
      if( i > -1) {
        this.entryToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibEntries[i]));
      } else {
        this.entryToEdit = {
          Key: '',
          Typ: '',
          Fields: [],
          CiteNumber: 0
        }
      }
    }
  },

  mounted() {
    //copy type at indexToEdit from store to data
    this.$nextTick(()=>{
      if( this.$store.state.editor.indexOfEdited >= 0) {
        this.entryToEdit = JSON.parse(JSON.stringify(this.$store.state.project.bibEntries[this.$store.state.editor.indexOfEdited]));
      } else {
        //bei neuem typen sind die felder noch nicht eingetragen
        this.neededFields = false;
      }
    });
  },

  computed: {
    saveNecessary(): boolean {
      if( this.$store.state.editor.indexOfEdited >= 0 ) {
        return JSON.stringify(this.entryToEdit) !== JSON.stringify(this.$store.state.project.bibEntries[this.$store.state.editor.indexOfEdited])
      }
      this.entryToEdit.Fields.forEach(f => {
        if( f.length > 0 ) {
          return false
        }
      });
      return this.entryToEdit.Key !== '' || this.entryToEdit.Typ !== '';
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
    indexOfEdited(): number {
      return this.$store.state.editor.indexOfEdited;
    }
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
    },
    triggerDeleteEntry() {
      this.deleteTriggered = true;
    },
    deleteEntry() {
      this.$store.dispatch(ActionTypes.EDITOR_DELETE_ENTRY, {Project: this.$store.state.app.currentProjectName, Key: this.$store.state.editor.key});
    },
    checkNeededFields() {
      if(this.entryToEdit.Key.length === 0) {
        this.neededFields = false;
      } else if(this.entryToEdit.Typ.length === 0) {
        this.neededFields = false;
      } else {
        this.neededFields = true;
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>