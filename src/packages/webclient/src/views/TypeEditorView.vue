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
            <p><b>Beispiel:</b> <span v-html="BibType.Model"></span></p>
            <v-simple-table
                hide-default-footer
            >
              <template >
                <tr v-for="field in BibType.Fields" :key="field.Field">
                  <td>
                    <v-text-field
                        v-model="field.Field"
                        name="Attribut"
                        @change="HandleChangeInBibFields"
                        type="string" />
                  </td>
                  <td>
                    <v-select
                        v-model="field.Style"
                        :items="fontStyles"
                        name="Style"
                        @change="HandleChangeInBibFields"
                        :menu-props="{ bottom: true, offsetY: true }"
                    ></v-select>
                  </td>
                  <td>
                    <v-text-field
                        v-model="field.Prefix"
                        name="Prefix"
                        @change="HandleChangeInBibFields"
                        type="string" />
                  </td>
                  <td>
                    <v-text-field
                        v-model="field.Suffix"
                        name="Suffix"
                        @change="HandleChangeInBibFields"
                        type="string" />
                  </td>
                  <td>
                    <v-btn icon>
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-simple-table>
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
import {MutationTypes} from "@/store/mutation-types";

export default Vue.extend({
  name: "TypeEditor-View",

  props: [
      'name'
  ],

  data() {
    return {
      panel: [0,1],
      headers: [{text: 'Attribut', value: 'Field', width: '25%'}, {text: 'Style', value: 'Style', width: '25%'}, {text: 'Prefix', value: 'Prefix', width: '25%'}, {text: 'Suffix', value: 'Suffix', width: '25%'}, ``],
      fontStyles: [{text: 'normal', value: 'normal'}, {text:'kursiv', value:'italic'}, {text:'fett', value: 'bold'}],
    }
  },

  computed: {
    changesToSave(): boolean {
      return false
    },
    TypeName(): string {
      return this.name
    },
    BibType: {
      get (): BibType {
        let ttR: BibType = {} as BibType;
        this.$vStore.state.bibTypes.forEach(bType => {
          if (bType.Name == this.TypeName) {
            console.log(bType.Fields)
            ttR = bType;
          }
        });
        return ttR;
      },
      set (value: BibType) {
        this.$store.commit(MutationTypes.UPDATE_MODEL_FOR_TYPE, this.TypeName)
      }
    }
  },

  methods: {
    HandleChangeInBibFields() {
      this.$store.commit(MutationTypes.UPDATE_MODEL_FOR_TYPE, this.TypeName)
    },
    // HandleChangeInCiteFields() {
    //
    // }
  }
});
</script>

<style scoped>
@import '../styles/fixesForDark.scss';
</style>