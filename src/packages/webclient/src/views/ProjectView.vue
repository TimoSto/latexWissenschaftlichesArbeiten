<template>
  <div style="height: 100%">
    <div style="height: 1230px; width: 30px; border: 1px solid black"></div>
<!--    <v-toolbar fixed dense>-->
<!--      <v-toolbar-title>Teeeeessstt</v-toolbar-title>-->
<!--    </v-toolbar>-->
<!--    <v-sheet id="scroll" class="overflow-y-auto" style="height:600px">-->
<!--      <v-container fluid>-->
<!--        <v-main>-->
<!--          <div style="height: 1234px"></div>-->
<!--        </v-main>-->
<!--      </v-container>-->
<!--    </v-sheet>-->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Project-View',

    components: {

    },

    mounted() {
      let elem = document.querySelector('#scroll')
    }
  })
</script>

<style lang="scss" scoped>

</style>