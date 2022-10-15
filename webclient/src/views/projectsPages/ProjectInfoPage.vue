<template>
  <div style="padding: 8px 16px" id="projectInfoPage">
    <p v-html="$t(i18nDictionary.Projects.Info.Description)"></p>
  </div>
</template>

<script>
import {i18nDictionary} from "@/i18n/Keys";

export default {
  name: "ProjectInfoPage",
  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
}
</script>

<style scoped>

</style>