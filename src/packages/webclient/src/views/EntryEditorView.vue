<template>
  <div>
    <v-app-bar color="background" elevate-on-scroll scroll-target="#scroll3" z-index="100">
      <v-toolbar-title>Literatureintrag: <span class="font-weight-bold">{{this.$store.state.initialEntry.Key}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon>
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
              <v-text-field v-model="$store.state.entryToEdit.Key" label="ID" filled></v-text-field>
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
              filled
          ></v-text-field>
          <v-text-field
              class="three-in-a-row"
              v-for="(field, i) in citeFields"
              :key="'TF' + (i + fields.length)" v-model="$store.state.entryToEdit.Fields[i + fields.length]"
              :label="field.Field"
              filled
          ></v-text-field>
        </v-container>
      </div>

    </v-sheet>

  </div>
</template>

<script lang="ts">
import {BibType, Field} from "@/api/bibTypes/BibType";
import Vue from "vue";
import {state} from "@/store/state";
import { MutationTypes } from "@/store/mutation-types";

export default Vue.extend({
  name: "EntryEditor-View",
  components: {},

  data() {
    return {
      unsafeClose: false
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
          console.log(bType.Fields)
          const fieldsInBib = bType.Fields.map(field => field.Field);
          console.log(fieldsInBib);
          bType.CiteFields.forEach(field => {
            if ( fieldsInBib.indexOf(field.Field) === -1 ) {
              fields.push(field);
              console.log(field.Field, fields)
            }
          })
        }
      });
      return fields;
    }
  },

  methods: {
    updateValueOfField(n: number) {
      console.log(n)
    }
  },

  created() {
    this.$store.commit(MutationTypes.UPDATE_PREVIEW);
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