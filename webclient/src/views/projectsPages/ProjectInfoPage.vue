<template>
  <div style="padding: 8px 16px" id="projectInfoPage">
    <p v-if="!revealJSAvailable">{{$t(i18nDictionary.Projects.Info.Description)}}</p>
    <div class="presentation-frame" v-if="revealJSAvailable">
      <div v-if="!started" style="position: absolute; top: calc(50% - 150px); left: calc(50% - 150px);">
        <v-btn icon style="width: 300px; height: 300px;" @click="started=true" color="primary">
          <v-icon size="300">mdi-play</v-icon>
        </v-btn>
      </div>
      <iframe ref="presentation" v-if="started"></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";
import Vue from "vue";

export default Vue.extend({
  name: "ProjectInfoPage",
  data() {
    return {
      i18nDictionary: i18nDictionary,
      revealJSAvailable: true,
      started: false
    }
  },
  watch: {
    started() {
      this.$nextTick(() => {
        const frame = this.$refs.presentation as HTMLIFrameElement;
        frame.addEventListener('load', () => {
          if( frame.contentDocument && !frame.contentDocument.body.classList.contains('reveal-viewport') ) {
            this.revealJSAvailable = false;
          }
        });
        if( frame && frame.contentWindow ) {
          frame.contentWindow.location.href = '/tutorials/reveal_js/presentation.html?presentation=projects&lang=' + this.$i18n.locale;
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.presentation-frame{
  width: 85%;
  max-width: 800px;
  height: 75vh;
  max-height: calc(100vh - 200px);
  border: 2px solid var(--v-accent-lighten4);
  margin: 0 auto;
  position: relative;
  & iframe {
    box-shadow: none;
    border: none;
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>