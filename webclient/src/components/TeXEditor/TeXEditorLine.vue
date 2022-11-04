<template>
  <div style="width: 100%;">
    <div class="line-editable" contenteditable="true"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TeXEditorLine",
  props: [
      "index"
  ]
})
</script>

<style scoped lang="scss">
.line-editable {
  min-width: calc(100% - 70px);
  display: inline-block;
  white-space: nowrap;
}
</style>