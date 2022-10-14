<template>
  <div style="display: flex">
    <div style="padding: 8px 16px">
      <p v-html="$t(i18nDictionary.Home.BibCard.Content)"></p>
    </div>
  </div>
</template>

<script lang="ts">
import {i18nDictionary} from "../i18n/Keys";

export default {
  name: "ProjectsView",

  data() {
    return {
      i18nDictionary: i18nDictionary
    }
  }
}
</script>

<style scoped>

</style>