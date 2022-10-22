<template>
  <div style="display: flex;" :class="layoutClasses">
    <div class="pages">
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
      } else if ( this.layout === 'two-thirds' ) {
        return ['two-thirds']
      }
      return ['half-screen']
    }
  }
})
</script>

<style scoped lang="scss">
.edit-area {
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;//TODO: shadow on right side if scrolled in overview and editor is open
}

.pages, .edit-area {
  transition: width .25s ease-in;
}

.pages {
  width: 100%;
  box-sizing: border-box;
}

.theme--light .pages {
  border-right: 1px solid rgba(0,0,0,0.1);
}

.theme--dark .pages {
  border-right: 1px solid rgba(255,255,255,0.1);
}

.edit-area {
  width: 0;
  z-index: 100;
}

.two-thirds {
  & .pages {
    width: 30%;
  }
  & .edit-area {
    width: 70%;
  }
}

.half-screen {
  & .pages {
    width: 50%;
  }
  & .edit-area {
    width: 50%;
  }
}

</style>