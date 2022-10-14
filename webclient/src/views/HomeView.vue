<template>
  <div>
    <v-app-bar elevation="1" color="background" elevate-on-scroll scroll-target="#scroll-home" style="z-index: 100" dense>
      <v-toolbar-title>{{$t(i18nDictionary.Home.Welcome)}}</v-toolbar-title>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px; background-color: var(--v-background-base)" id="scroll-home">
      <p style="margin: 0 8px">{{$t(i18nDictionary.Home.Description)}}</p>
      <div class="tilesContainer">
        <HomeTile v-for="(t,i) in tiles" :key="'tile-'+i"
                  :title="t.Title"
                  :content="t.Content"
                  :icon="t.Icon"
                  v-on:clicked="handleCardClick(i)"
        />
        <div style="clear:both"></div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { i18nDictionary } from '@/i18n/Keys';
import Vue from 'vue';
import HomeTile from "../components/HomeTile.vue";
import MutationTypes from "../store/MutationTypes";
import downloadFile from "../api/app/DownloadFile";

type Tile = {
  Title: string,
  Href: string,
  Icon: string,
  Content: string
}

export default Vue.extend({
  name: 'Home-View',
  components: {HomeTile},
  data() {
    return {
      i18nDictionary: i18nDictionary,
      tiles: [
        {
          Title: this.$t(i18nDictionary.Home.TemplateCard.Title),
          Content: this.$t(i18nDictionary.Home.TemplateCard.Content),
          Icon: 'mdi-download'
        },
        {
          Title: this.$t(i18nDictionary.Home.BibCard.Title),
          Content: this.$t(i18nDictionary.Home.BibCard.Content),
          Icon: 'mdi-folder'
        },
        {
          Title: this.$t(i18nDictionary.Home.CVCard.Title),
          Content: this.$t(i18nDictionary.Home.CVCard.Content),
          Icon: 'mdi-download'
        },
        {
          Title: this.$t(i18nDictionary.Home.ContactCard.Title),
          Content: this.$t(i18nDictionary.Home.ContactCard.Content),
          Icon: 'mdi-open-in-new'
        }
      ] as Tile[]
    }
  },

  methods: {
    handleCardClick(card: number) {
      switch (card) {
        case 0:
          console.debug('download template');
          downloadFile('projectTemplate.zip', '/projectTemplate');
          break;
        case 1:
          console.debug('go to projects');
          this.$store.commit(MutationTypes.App.SetCurrentView, "projects")
          break;
        case 2:
          console.debug('download cv-template');
          downloadFile('cvTemplate.zip', '/cvTemplate');
          break;
        case 3:
          console.debug('go to github');
          window.open('https://github.com/TimoSto/latexWissenschaftlichesArbeiten/issues','_blank')
          break;
      }
    }
  }
})
</script>

