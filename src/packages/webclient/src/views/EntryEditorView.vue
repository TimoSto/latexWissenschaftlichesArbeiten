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
    <v-sheet style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0" id="scroll3">
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
            <v-text-field v-model="$store.state.entryToEdit.Typ" label="Literaturtyp" filled></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="display">
        <p><span style="font-weight: bold">Literatureintrag: </span></p>
        <p><span style="font-weight: bold">Zitat: </span></p>
      </v-container>
      <v-container>
        <v-text-field
            v-for="(field, i) in $store.state.entryToEdit.Fields"
            :key="field" v-model="$store.state.entryToEdit.Fields[i]"
            filled
        ></v-text-field>
      </v-container>
    </v-sheet>

  </div>
</template>

<script lang="ts">
import {BibType, Field} from "@/api/bibTypes/BibType";
import Vue from "vue";
import {state} from "@/store/state";

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
          const fieldNames = fields.map((field: Field) => field.Field)
          bType.CiteFields.forEach( (field: Field) => {
            if( fieldNames.indexOf(field.Field) === -1 ) {
              fields.push(field);
            }
          });
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
</style>