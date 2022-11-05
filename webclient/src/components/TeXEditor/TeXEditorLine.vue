<template>
  <div class="line-container">
    <div class="line-editable" contenteditable="true" ref="line" @input="onInput($event)"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TeXEditorLine",
  props: [
      "index",
      "initialValue"
  ],
  mounted() {
    this.$nextTick(() => {
      const lineRef = this.$refs.line as HTMLElement;
      if( lineRef ) {
        lineRef.textContent = this.initialValue
      }
    })
  },
  methods: {
    onInput(e: InputEvent) {
      if( e.target ) {
        this.$emit('valueChange', (e.target as HTMLElement).textContent);
      }
    }
  }
})
</script>

<style scoped lang="scss">
.line-container {
  min-width: 100%;
  & .line-index {
    width: 60px;
    text-align: right;
    position: absolute;
    background-color: var(--v-background-base);
    border-right: 1px solid var(--v-accent-lighten2);
    padding-right: 8px;
    box-sizing: border-box;
  }
  & .line-editable {
    white-space: nowrap;
    display: inline-block;
    min-width: 100%;
    &:focus-within {
      outline: none;
    }
  }
}
</style>