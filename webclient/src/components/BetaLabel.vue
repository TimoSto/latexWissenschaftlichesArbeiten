<template>
  <span class="beta-label">beta</span>
</template>

<script>
export default {
  name: "BetaLabel"
}
</script>

<style scoped lang="scss">
.beta-label{
  position: absolute;
  width: 80px;
  height: 25px;
  background: var(--v-primary-base);
  top: 55px;
  right: -20px;
  text-align: center;
  font-size: 13px;
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  line-height: 27px;
  transform:rotate(45deg);
  z-index: 99;
}
</style>