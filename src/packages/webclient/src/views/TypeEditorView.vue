<template>
  <div>
    <v-app-bar elevation="0" color="background">
      <v-toolbar-title>Literaturtyp: <span class="font-weight-bold">{{TypeName}}</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!changesToSave">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main style="overflow-y: scroll; height: calc(100vh - 130px); padding: 0">
      <v-container style="padding-bottom: 0">
        <v-row>
          <v-col
              cols="16"
              sm="8"
              md="4"
          >
            <v-text-field v-model="TypeName" label="Bezeichnung" filled></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-expansion-panels v-model="panel" multiple accordion flat hover tile>
        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Literaturverzeichnis
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <template>
              <v-data-table
                  :headers="headers"
                  :items="BibType.Fields"
                  hide-default-footer
              >
                <template v-slot:item="props">
                  <v-text-field
                      v-model="props.item.Name"
                      name="quantity"
                      @input="getdata"
                      type="string"
                  ></v-text-field>
                  <v-text-field
                      v-model="props.item.Prefix"
                      name="quantity"
                      @input="getdata"
                      type="string"
                  ></v-text-field>
                </template>
              </v-data-table>
            </template>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header ripple>
            Zitate
          </v-expansion-panel-header>
          <v-expansion-panel-content>
<!--            <v-expansion-panels v-model="citepanel" multiple accordion flat hover tile>-->
<!--              <v-expansion-panel v-for="(field, i) in BibType.CiteFields" :key="'citeFields' + i">-->
<!--                <v-expansion-panel-header ripple>-->
<!--                  {{ field.Field }}-->
<!--                </v-expansion-panel-header>-->
<!--                <v-expansion-panel-content></v-expansion-panel-content>-->
<!--              </v-expansion-panel>-->
<!--            </v-expansion-panels>-->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {BibType} from "@/api/bibTypes/BibType";

export default Vue.extend({
  name: "TypeEditor-View",

  props: [
      'name'
  ],

  data() {
    return {
      panel: [0,1],
      headers: [{text: 'Attribut', value: 'Field', width: '40%'}, {text: 'Prefix', value: 'Prefix', width: '50%'}]
    }
  },

  computed: {
    changesToSave(): boolean {
      return false
    },
    TypeName(): string {
      return this.name
    },
    BibType(): BibType {
      console.log('readTypes')
      let ttR: BibType = {} as BibType;
      this.$vStore.state.bibTypes.forEach(bType => {
        if( bType.Name == this.TypeName ) {
          ttR = bType;
        }
      });
      return ttR;
    }
  }
});
</script>

<style scoped>
@import '../styles/fixesForDark.scss';
</style>