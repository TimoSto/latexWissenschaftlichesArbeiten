<template>
  <div style="display: flex;">
    <div class="pages" :class="layoutClasses">
      <div class="page page1">
        <slot name="page1"></slot>
      </div>
      <div class="page page2">
        <slot name="page2"></slot>
      </div>
    </div>
    <div class="edit-area">
      <slot name="edit-area"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NavArea",
  props: [
      'layout',
      'editor'
  ],
  computed: {
    layoutClasses(): string[] {
      if( !this.editor ) {
        return ["full-screen"]
      } else if ( this.layout === 'two-thrids' ) {
        return ['two-thrids']
      }
      return ['half-screen']
    }
  }
})
</script>

<style scoped lang="scss">
.pages {
  width: 100%;

  & .page1, & .page2, & .edit-area {
    transition: width 0.25s ease-in-out;
  }

  &.half-screen {
    & .page1{
      width: 50%;
    }
    & .edit-area{
      width: 50%;
    }
  }

  &.two-thrids {
    & .page1{
      width: 30%;
    }
    & .edit-area{
      width: 70%;
    }
  }
}
</style>