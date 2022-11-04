<template>
  <div class="flex">
    <div>
      Text to check
    </div>
    <div>
      Text to check for similar width
    </div>
    <div>
      Text to check for similar width - will it work
    </div>
    <div>
      <TeXEditorLine index="1"></TeXEditorLine>
    </div>
    <div>
      <TeXEditorLine index="2"></TeXEditorLine>
    </div>
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
.flex{
  display:inline-flex;
  flex-direction:column;
  align-items:baseline
}
.flex > div{
  background:#aaa;
  width: 100%;
}
</style>