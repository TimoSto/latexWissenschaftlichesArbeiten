<template>
  <iframe id="pdfFrame"></iframe>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'PDF-Viewer',

  mounted() {
    console.log('mounted')
    let parts = window.location.href.split('/');
    let name = parts[parts.length - 1]
    if(parts[parts.length - 2] === 'project') {
      (document.querySelector('#pdfFrame') as HTMLIFrameElement).src = '/getPDF?project='+name
    } else {
      (document.querySelector('#pdfFrame') as HTMLIFrameElement).src = '/' + name + '?type=pdf'
    }
  }
})
</script>

<style scoped>
iframe {
  border: none;
  width: 100%;
  height: calc(100% - 8px);
}
</style>