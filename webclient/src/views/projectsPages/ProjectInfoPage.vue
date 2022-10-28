<template>
  <div style="padding: 8px 16px" id="projectInfoPage">
    <p v-html="$t(i18nDictionary.Projects.Info.Description)"></p>
    <RevealJsContainer />
  </div>
</template>

<script>
import {i18nDictionary} from "@/i18n/Keys";
import RevealJsContainer from "@/components/RevealJsContainer";

export default {
  name: "ProjectInfoPage",
  components: {RevealJsContainer},
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
}
</script>

<style scoped>

</style>