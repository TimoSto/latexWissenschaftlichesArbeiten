<template>
  <div class="container">
    <div class="line">

    </div>
    <div class="line" style="width: 2345px">

    </div>
    <TeXEditorLine index="0"/>
    <TeXEditorLine index="10"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TeXEditorLine from "./TeXEditorLine.vue";
export default Vue.extend({
  name: "TeXEditArea",
  components: {TeXEditorLine}
})
</script>

<style scoped lang="scss">
.container {
  width: auto;
  display: inline-block;
  & .line {
    min-width: 100%;
    border: 1px solid black;
    width: auto;
    height: 40px;
  }
}
</style>