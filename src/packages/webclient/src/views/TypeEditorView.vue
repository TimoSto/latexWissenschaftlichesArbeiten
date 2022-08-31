<template>
  <div>
    <v-app-bar color="background" elevate-on-scroll scroll-target="#scrolling-techniques-7" style="z-index:100">
      <v-toolbar-title>Literaturtyp: <span class="font-weight-bold">{{this.$store.state.initialType.Name}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!changesToSave" @click="SaveThisType">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="tryDelete = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="CloseEditor">
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
            <v-text-field v-model="$store.state.typeToEdit.Name" label="Bezeichnung" filled :rules="rules"></v-text-field>
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
    <UnsafeCloseDialog :model="unsafeClose || unsafeSwitch.length > 0 || unsafeSwitchToEntry.length > 0" v-on:no="unsafeClose = false; unsafeSwitch = ''; unsafeSwitchToEntry = ''" v-on:yes="AcceptUnsafe"/>
    <DeleteDialog :model="tryDelete" type="Literaturtyp" :typekey="this.$store.state.initialType.Name" v-on:no="tryDelete = false" v-on:yes="DeleteType"></DeleteDialog>
    <ErrorDialog :message="this.$store.state.errorMessage" v-on:close="ClearError"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {MutationTypes} from "@/store/mutation-types";
import MyDataTable from "@/components/MyDataTable.vue";
import {ActionTypes} from "@/store/action-types";
import UnsafeCloseDialog from "@/components/UnsafeCloseDialog.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default Vue.extend({
  name: "TypeEditor-View",
  components: {DeleteDialog, UnsafeCloseDialog, MyDataTable, ErrorDialog},
  props: [
      'name'
  ],

  data() {
    return {
      panel: [0,1],
      headers: [{text: 'Attribut', value: 'Field', width: '25%'}, {text: 'Style', value: 'Style', width: '25%'}, {text: 'Prefix', value: 'Prefix', width: '25%'}, {text: 'Suffix', value: 'Suffix', width: '25%'}, {text: 'Tex-Parsen', value: 'TexParsed', width: '5%'}, ``],
      fontStyles: [{text: 'normal', value: 'normal'}, {text:'kursiv', value:'italic'}, {text:'fett', value: 'bold'}],
      unsafeClose: false,
      unsafeSwitch: '',
      unsafeSwitchToEntry: '',
      rules: [
        (value: any) => !!value || 'Pflichtfeld',
      ],
      tryDelete: false
    }
  },

  mounted() {
    this.$parent?.$on('tryClosingTypeWithChanges', (evt:string)=>{
      this.unsafeSwitch = evt;
    })
    this.$parent?.$on('tryClosingTypeWithChangesAndOpenEntry', (evt:string)=>{
      console.log(evt)
      this.unsafeSwitchToEntry = evt;
    })
  },

  computed: {
    changesToSave(): boolean {
      return JSON.stringify(this.$store.state.initialType) != JSON.stringify(this.$store.state.typeToEdit) && this.$store.state.typeToEdit.Name.length > 0
    }
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
    SaveThisType() {
      this.$store.commit(MutationTypes.CLEANUP_FIELDS);

      const obj = JSON.stringify({
        Project: this.$store.state.project,
        InitialName: this.$store.state.initialType.Name,
        Type: {
          Name: this.$store.state.typeToEdit.Name,
          Fields: this.$store.state.typeToEdit.Fields,
          CiteFields: this.$store.state.typeToEdit.CiteFields
        }
      });

      this.$store.dispatch(ActionTypes.SAVE_TYPE, obj);
    },
    CloseEditor() {
      if( this.changesToSave ) {
        this.$data.unsafeClose = true;
      } else {
        this.$emit('closeEditor')
      }
    },
    DeleteType() {
      this.$store.dispatch(ActionTypes.DELETE_TYPE, {
        project: this.$store.state.project,
        name: this.$store.state.initialType.Name
      });
    },
    ClearError() {
      this.$store.commit(MutationTypes.CLEAR_ERROR);
    },
    AcceptUnsafe() {
      if( this.$data.unsafeSwitch.length > 0 ) {
        this.$emit('editType', this.unsafeSwitch)
        this.unsafeSwitch = '';
      } else if( this.$data.unsafeSwitchToEntry.length > 0 ) {
        this.$emit('editEntry', this.unsafeSwitchToEntry)
        this.unsafeSwitchToEntry = '';
      }{
        this.$emit('closeEditor')
      }
    }
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/fixesForDark.scss';
</style>