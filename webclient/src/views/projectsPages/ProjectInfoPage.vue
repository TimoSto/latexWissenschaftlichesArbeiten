<template>
  <div style="padding: 8px 16px" id="projectInfoPage">
    <p v-html="$t(i18nDictionary.Projects.Info.Description)"></p>
    <iframe class="presentation-frame" ref="presentation"></iframe>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "@/i18n/Keys";
import Vue from "vue";

export default Vue.extend({
  name: "ProjectInfoPage",
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  },
  mounted() {
    this.$nextTick(() => {
      const frame = this.$refs.presentation as HTMLIFrameElement;
      if( frame && frame.contentWindow ) {
        frame.contentWindow.location.href = '/tutorials/reveal_js/presentation.html'
      }
    })
  }
})
</script>

<style scoped>
.presentation-frame{
  width: 85%;
  max-width: 800px;
  height: 75vh;
  max-height: calc(100vh - 200px);
  border: 2px solid var(--v-accent-lighten4);
  box-shadow: none;
  display: block;
  margin: 0 auto;
}
</style>