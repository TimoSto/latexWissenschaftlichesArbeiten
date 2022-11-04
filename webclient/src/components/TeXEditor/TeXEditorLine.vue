<template>
  <div class="line-container">
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
.line-container {
  min-width: 100%;
  & .line-editable {
    white-space: nowrap;
    border: 1px solid black;
    display: inline-block;
    min-width: 100%;
  }
}
</style>