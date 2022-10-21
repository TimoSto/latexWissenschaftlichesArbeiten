<template>
  <div>
    <v-app-bar
        color="background"
        elevate-on-scroll
        scroll-target="#category-editor-scroll"
        dense
        >
      <v-toolbar-title>{{$t(i18nDictionary.Projects.CategoryEditor.Title)}}</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="$emit('toggleTwoThirds')" style="font-size: 20px" :title="layoutBtnContent[1]">
        <span v-html="layoutBtnContent[0]" style="color: var(--v-accent-lighten2)"></span>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Delete)" >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon :title="$t(i18nDictionary.Common.Close)" @click="$emit('closeEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" id="category-editor-scroll">

      <v-expansion-panels tile flat hover multiple>

        <v-expansion-panel>
          <v-expansion-panel-header>
            {{$t(i18nDictionary.Projects.CategoryEditor.Properties)}}
          </v-expansion-panel-header>

          <v-expansion-panel-content class="content-with-padding">
            <div class="centered">
              <v-simple-table class="attr-value-table" style="max-width: 500px">
                <tbody>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.InitialName)}}</td>
                  <td style="font-style: italic">hallo</td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.Name)}}</td>
                  <td>
                    <v-text-field type="string"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.CitaviCategory)}}</td>
                  <td>
                    <v-text-field type="string"></v-text-field>
                  </td>
                </tr>
                <tr>
                  <td>{{$t(i18nDictionary.Projects.CategoryEditor.CitaviNecessaryFields)}}</td>
                  <td>
                    <v-text-field type="string"></v-text-field>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
            </div>
          </v-expansion-panel-content>

        </v-expansion-panel>

      </v-expansion-panels>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "CategoryEditor",
  props: [
      'layoutBtnContent'
  ],
  data() {
    return {
      i18nDictionary: i18nDictionary,
    }
  }
}
</script>

<style scoped lang="scss">
@use "@/styles/tableClasses.scss";


</style>