<template>
  <div style="display: flex">
    <div class="pages">
      <div class="page1">
        <slot name="page1"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavArea"
}
</script>

<style scoped>

</style>