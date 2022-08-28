<template>
  <div>
    <v-app-bar color="background" elevate-on-scroll scroll-target="#scroll3" style="z-index: 100">
      <v-toolbar-title>Literatureintrag: <span class="font-weight-bold">{{this.$store.state.initialEntry.Key}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!changesToSave || !requiredFieldsFilled" @click="saveEntry">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="tryDelete = true" :disabled="!this.$store.state.initialEntry.Key">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="CloseEditor">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0;" id="scroll3">
      <div style="max-width: 800px">
        <v-container style="height: 120px; padding-top: 30px;">
          <v-row>
            <v-col
                cols="16"
                sm="8"
                md="4"
            >
              <v-text-field v-model="$store.state.entryToEdit.Key" label="ID" filled :rules="rules"></v-text-field>
            </v-col>
            <v-col
                cols="16"
                sm="8"
                md="4"
            >
              <v-select
                  v-model="$store.state.entryToEdit.Typ"
                  :items="$store.state.bibTypes.map(bType=>bType.Name)"
                  label="Literaturtyp"
                  filled
                  :menu-props="{ bottom: true, offsetY: true }"
                  @change="updatePreviews"
                  :rules="rules"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="display">
          <p><span style="font-weight: bold">Literatureintrag: </span><span v-html="$store.state.entryToEdit.BibPreview" /></p>
          <p><span style="font-weight: bold">Zitat: </span><span v-html="$store.state.entryToEdit.CitePreview" /></p>
        </v-container>
        <v-container>
          <v-text-field
              class="three-in-a-row"
              v-for="(field, i) in fields"
              :key="'TF' + i" v-model="$store.state.entryToEdit.Fields[i]"
              :label="field.Field"
              :rules="getRule(i)"
              @input="updatePreviews"
              filled
          ></v-text-field>
          <v-text-field
              class="three-in-a-row"
              v-for="(field, i) in citeFields"
              :key="'TF' + (i + fields.length)" v-model="$store.state.entryToEdit.Fields[i + fields.length]"
              :label="field.Field"
              @input="updatePreviews"
              filled
          ></v-text-field>
        </v-container>
      </div>

    </v-sheet>
    <UnsafeCloseDialog :model="unsafeClose" v-on:no="unsafeClose = false" v-on:yes="$emit('closeEditor')"/>
    <DeleteDialog :model="tryDelete" type="Literatureintrag" :typekey="this.$store.state.initialEntry.Key" v-on:no="tryDelete = false" v-on:yes="DeleteEntry"></DeleteDialog>
  </div>
</template>

<script lang="ts">
import {BibType, Field} from "@/api/bibTypes/BibType";
import Vue from "vue";
import { MutationTypes } from "@/store/mutation-types";
import { ActionTypes } from "@/store/action-types";
import UnsafeCloseDialog from "@/components/UnsafeCloseDialog.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";

export default Vue.extend({
  name: "EntryEditor-View",
  components: {UnsafeCloseDialog, DeleteDialog},

  data() {
    return {
      unsafeClose: false,
      rules: [
        (value: any) => !!value || 'Pflichtfeld',
      ],
      tryDelete: false
    }
  },

  computed: {
    fields(): Field[] {
      let fields = [] as Field[];
      this.$store.state.bibTypes.forEach((bType: BibType) => {
        if( bType.Name === this.$store.state.entryToEdit.Typ ) {
          fields = bType.Fields;
        }
      });
      return fields;
    },
    citeFields(): Field[] {
      let fields = [] as Field[];
      this.$store.state.bibTypes.forEach((bType: BibType) => {
        if( bType.Name === this.$store.state.entryToEdit.Typ ) {
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
    changesToSave() {
      let currentWithoutPreview = JSON.parse(JSON.stringify(this.$store.state.entryToEdit));
      currentWithoutPreview.BibPreview = '';
      currentWithoutPreview.CitePreview = '';

      return JSON.stringify(currentWithoutPreview) !== JSON.stringify(this.$store.state.initialEntry)
    },
    requiredFieldsFilled() {
      return !!this.$store.state.entryToEdit.Key && this.$store.state.entryToEdit.Key.length > 0 && !!this.$store.state.entryToEdit.Typ &&
          this.$store.state.entryToEdit.Fields.length > 0 && this.$store.state.entryToEdit.Fields[0].length > 0
    }
  },

  methods: {
    updatePreviews() {
      this.$store.commit(MutationTypes.UPDATE_PREVIEW);
    },
    saveEntry() {
      const SaveObj = {
        InitialKey: this.$store.state.initialEntry.Key,
        Project: this.$store.state.project,
        Entry: {
          Key: this.$store.state.entryToEdit.Key,
          Typ: this.$store.state.entryToEdit.Typ,
          Fields: this.$store.state.entryToEdit.Fields,
        }
      }

      const jsonObj = JSON.stringify(SaveObj);
      this.$store.dispatch(ActionTypes.SAVE_ENTRY, jsonObj);
    },
    CloseEditor() {
      if( this.changesToSave ) {
        this.$data.unsafeClose = true;
      } else {
        this.$emit('closeEditor')
      }
    },
    getRule(n:number) {
      if( n==0 ){
        return this.rules
      } else {
        return []
      }
    },
    DeleteEntry() {
      this.$store.dispatch(ActionTypes.DELETE_ENTRY, {
        project: this.$store.state.project,
        key: this.$store.state.initialEntry.Key
      });
    }
  }
});
</script>

<style lang="scss" scoped>
@import '../styles/fixesForDark.scss';

.display{
  width: 95%;
  border-radius: 16px;
  border: 3px solid;
}

.theme--light .display{
  border-color: var(--v-accent-lighten4);
}
.theme--dark .display{
  border-color: var(--v-accent-darken4);
}

.three-in-a-row {
  width: 50%;
  float: left;
  padding: 0 8px;
}
</style>