<template>
  <div>
    <div class="reveal">
      <div class="slides">
        <section data-markdown="/tutorials/reveal_js/projects_de.md" data-separator="^\n\n\n" data-separator-vertical="^\n\n">
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

export default Vue.extend({
  name: "RevealJsContainer",
  mounted() {
    Reveal.initialize({
      // used to keep current slide during browser reload
      // fragment: true,
      // fragmentInURL: true
      controls: true,
      progress: true,
      center: true,
      embedded: true,

      transition: 'slide', // none/fade/slide/convex/concave/zoom
      transitionSpeed: 'fast',
      totalTime: 15 * 60,

      slideNumber: 'c/t',

      // IMPORTANT: The order matters!
      // So, RevealHightlight must be the LAST to load
      plugins: [
        Markdown, Notes, Highlight,
      ]
    });
    document.querySelector( '.reveal' ).style.width = '50vw';

// Make reveal.js aware of the size change
    Reveal.layout();
  }
})
</script>

<style scoped lang="scss">
@use "reveal.js/dist/reveal";
</style>