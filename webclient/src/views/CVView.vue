<template>
  <div>
    <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-cv" style="z-index: 100" dense>
      <v-toolbar-title>{{$t(i18nDictionalry.CV_HEADING)}}</v-toolbar-title>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px; background-color: var(--v-background-base)" id="scroll-cv">
      <p style="margin: 0 8px">{{$t(i18nDictionalry.CV_DESCR)}}</p>

      <div class="centered download-area">
        <a href="/cvTemplate?type=pdf" download="cvTemplate.pdf" class="download-field">
          <v-icon>mdi-download</v-icon>
          <span>PDF</span>
        </a>

        <a href="/cvTemplate?type=tex" download="cvTemplate.tex" class="download-field">
          <v-icon>mdi-download</v-icon>
          <span>TeX</span>
        </a>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import {i18nDictionary} from "@/i18n/Keys";

export default Vue.extend({
  name: "CV-View",
  data() {
    return {
      i18nDictionalry: i18nDictionary
    }
  }
});
</script>

<style scoped lang="scss">

.download-area {
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 80px;
  & .download-field {
    width: 50%;
    border-radius: 8px;
    background-color: var(--v-primary-base);
    color: var(--v-primaryText-base)!important;
    border: 1px solid rgba(128, 128, 128, 1);
    box-sizing: border-box;
    text-align: center;
    height: 80px;
    padding-top: 4px;
    margin: 8px;
    & .v-icon {
      font-size: 30px;
      display: block;
      color: var(--v-primaryText-base)!important;
    }
    & span {
      font-size: 25px;
    }
  }
}
</style>