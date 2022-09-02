<template>
  <v-simple-table style="max-width: 750px"
  >
    <v-data-table-header :headers="headers" disable-sort/>
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
      <td>
        <v-btn icon @click="emitAdded">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </td>
    </tr>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "My-DataTable",
  props: [
      "fields",
      "keyprefix"
  ],
  data() {
    return {
      headers: [{text: 'Attribut', value: 'Field', width: '25%'}, {text: 'Style', value: 'Style', width: '25%'}, {text: 'Prefix', value: 'Prefix', width: '25%'}, {text: 'Suffix', value: 'Suffix', width: '25%'}, {text: 'TeX-Wert', value: 'TexValue', width: '5%', align: 'center'},  ``],
      fontStyles: [{text: 'normal', value: 'normal'}, {text:'kursiv', value:'italic'}, {text:'fett', value: 'bold'}],
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