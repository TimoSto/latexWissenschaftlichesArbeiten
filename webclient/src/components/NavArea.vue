<template>
  <div class="container" :class="layoutClasses">

    <div class="pages" style="display: none">
      <div v-for="i in pages" :key="`page-${i}`" :id="`page-${i}`">
        <slot :name="`page-${i}`"></slot>
      </div>
    </div>

    <div class="pages">
      <div id="page-1" style="background-color: red" class="opened"></div>
      <div id="page-2" style="background-color: blue"></div>
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
      'editor',
      'pages'
  ],
  computed: {
    layoutClasses(): string[] {
      if( !this.editor ) {
        return ["full-screen"]
      } else if ( this.layout === 'two-thirds' ) {
        return ['two-thirds']
      }
      return ['half-screen']
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0;
  & .pages {
    width: 100%;
    display: flex;
    flex: 1 1 auto;
    box-sizing: border-box;
    & [id^=page-] {
      flex: 1 0 auto;
      height: 100%;
      width: 0;
      transition: width .25s ease-in-out;
      &.opened {
        width: 100%;
      }
    }
  }
}
</style>

<!--<style scoped lang="scss">-->
<!--.edit-area {-->
<!--  flex-grow: 1;-->
<!--  min-width: 0;-->
<!--  overflow: hidden;//TODO: shadow on right side if scrolled in overview and editor is open-->
<!--}-->

<!--.pages, .edit-area {-->
<!--  transition: width .25s ease-in;-->
<!--}-->

<!--.pages {-->
<!--  width: 100%;-->
<!--  box-sizing: border-box;-->
<!--  display: flex;-->
<!--  flex: 1 1 auto;-->
<!--  & [id^=page-] {-->
<!--    flex: 1 0 auto;-->
<!--    height: 100%;-->
<!--  }-->
<!--}-->

<!--.theme&#45;&#45;light .pages {-->
<!--  border-right: 1px solid rgba(0,0,0,0.1);-->
<!--}-->

<!--.theme&#45;&#45;dark .pages {-->
<!--  border-right: 1px solid rgba(255,255,255,0.1);-->
<!--}-->

<!--.edit-area {-->
<!--  width: 0;-->
<!--  z-index: 100;-->
<!--}-->

<!--.two-thirds {-->
<!--  & .pages {-->
<!--    width: 30%;-->
<!--  }-->
<!--  & .edit-area {-->
<!--    width: 70%;-->
<!--  }-->
<!--}-->

<!--.half-screen {-->
<!--  & .pages {-->
<!--    width: 50%;-->
<!--  }-->
<!--  & .edit-area {-->
<!--    width: 50%;-->
<!--  }-->
<!--}-->

<!--</style>-->