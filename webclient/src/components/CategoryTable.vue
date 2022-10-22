<template>
  <div class="centered">
    <v-simple-table disable-sort>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left" style="width: 18%">
            {{headers[0].text}}
          </th>
          <th class="text-left" style="width: 18%">
            {{headers[1].text}}
          </th>
          <th class="text-left" style="width: 18%">
            {{headers[2].text}}
          </th>
          <th class="text-left" style="width: 18%">
            {{headers[3].text}}
          </th>
          <th class="text-left" style="width: 5%;">
            {{headers[4].text}}
          </th>
          <th class="text-left" style="width: 18%;" v-if="showCitaviAttrs === 'true'">
            Citavi-Attribute
          </th>
          <th style="width: 5%;"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(field,i) in fields" :key="keyprefix + 'edit' + i" class="editableTableRow">
          <td>
            <v-text-field
                v-model="field.Field"
                name="Attribut"
                @input="emitChange"
                type="string" />
          </td>
          <td>
            <v-select
                v-model="field.Style"
                :items="fontStyles"
                name="Style"
                @input="emitChange"
                :menu-props="{ bottom: true, offsetY: true }"
                attach
            ></v-select>
          </td>
          <td>
            <v-text-field
                v-model="field.Prefix"
                name="Prefix"
                @input="emitChange"
                type="string" />
          </td>
          <td>
            <v-text-field
                v-model="field.Suffix"
                name="Suffix"
                @input="emitChange"
                type="string" />
          </td>
          <td>
            <v-checkbox v-model="field.TexValue" />
          </td>
          <td v-if="showCitaviAttrs === 'true'">
            <v-combobox v-model="field.CitaviAttributes" multiple :items="citaviAttrs" @focus="focusedCombo = i" @blur="focusedCombo = -1" :menu-props="{closeOnContentClick: true}">
              <template v-slot:item="{ item }">
                {{item}}
              </template>
              <template v-slot:selection="{ item, index }" v-if="focusedCombo !== i">
                <span v-if="index < 1">{{ item }} &nbsp;</span>
                <span
                    v-if="index === 1"
                    class="grey--text caption"
                >(+{{ field.CitaviAttributes.length - 1 }})</span>
              </template>
            </v-combobox>
          </td>
          <td>
            <v-btn icon @click="emitRemove(i)">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr class="editableTableRow">
          <td>
            <v-text-field disabled placeholder="Attribut"></v-text-field>
          </td>
          <td>
            <v-select disabled placeholder="Style"></v-select>
          </td>
          <td>
            <v-text-field disabled placeholder="Prefix"></v-text-field>
          </td>
          <td>
            <v-text-field disabled placeholder="Suffix"></v-text-field>
          </td>
          <td>
            <v-checkbox disabled/>
          </td>
          <td v-if="showCitaviAttrs === 'true'">
            <v-combobox disabled />
          </td>
          <td>
            <v-btn icon @click="emitAdded">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";

//TODO: select overflow not shown
export default Vue.extend({
  name: "CategoryTable",
  props: [
    "fields",
    "keyprefix",
    "showCitaviAttrs"
  ],
  data() {
    return {
      headers: [{text: this.$t(i18nDictionary.Projects.CategoryEditor.Attribute), value: 'Field', width: '25%'}, {text: this.$t(i18nDictionary.Projects.CategoryEditor.Style), value: 'Style', width: '25%'}, {text: this.$t(i18nDictionary.Projects.CategoryEditor.Prefix), value: 'Prefix', width: '25%'}, {text: this.$t(i18nDictionary.Projects.CategoryEditor.Suffix), value: 'Suffix', width: '25%'}, {text: this.$t(i18nDictionary.Projects.CategoryEditor.TeX_Value), value: 'TexValue', width: '5%', align: 'center'},  ``],
      fontStyles: [{text: this.$t(i18nDictionary.Projects.CategoryEditor.Normal), value: 'normal'}, {text:this.$t(i18nDictionary.Projects.CategoryEditor.Italic), value:'italic'}],
      citaviAttrs: ['author', 'title', 'booktitle', 'publisher', 'year', 'address', 'editor', 'isbn', 'pages', 'url', 'doi'],
      focusedCombo: -1,
      i18nDictionary: i18nDictionary
    }
  },
  methods: {
    emitChange() {
      this.$emit('changed');
    },
    emitRemove(n: number) {
      this.$emit('removed', n)
    },
    emitAdded() {
      this.$emit('added');
    }
  }
});
</script>

<style lang="scss" scoped>
.editableTableRow {
  & td {
    padding: 0 8px;
  }
}
</style>
<style>
.v-application--is-ltr .v-input--selection-controls__input{
  margin: 0 auto!important;
}
</style>