<template>
  <NavArea :editor="editorOpen" :layout="twoThirdsMode ? 'two-thirds' : 'half-screen'">
    <template v-slot:page1>
      <ProjectInfoPage v-if="currentProjectName === ''"/>
      <ProjectOverviewPage v-if="currentProjectName !== ''" v-on:openEditor="openEditor($event)"/>
    </template>
    <template v-slot:edit-area>
      <EntryEditor
          v-if="editorType === 'entry'"
          v-on:closeEditor="openEditor({Type: '', Element: ''})"
          v-on:toggleTwoThirds="toggleTwoThirds"
          :layoutBtnContent="layoutBtnContent"
      />
      <CategoryEditor
          v-if="editorType === 'category'"
          v-on:closeEditor="openEditor({Type: '', Element: ''})"
          v-on:toggleTwoThirds="toggleTwoThirds"
          :layoutBtnContent="layoutBtnContent"
      />
    </template>
  </NavArea>
</template>

<script lang="ts">
import Vue from "vue";
import {i18nDictionary} from "../i18n/Keys";
import ProjectInfoPage from "./projectsPages/ProjectInfoPage.vue";
import NavArea from "../components/NavArea.vue";
import ProjectOverviewPage from "./projectsPages/ProjectOverviewPage.vue";
import ActionTypes from "../store/ActionTypes";
import EntryEditor from "./projectsPages/EntryEditor.vue";
import CategoryEditor from "./projectsPages/CategoryEditor.vue";

export interface EditorEvent {
  Type: string
  Element: string
}

export default Vue.extend({
  name: "ProjectsView",
  components: {CategoryEditor, EntryEditor, ProjectOverviewPage, NavArea, ProjectInfoPage},
  data() {
    return {
      i18nDictionary: i18nDictionary,
      twoThirdsMode: false,
      editorType: '',
      editorElement: ''
    }
  },

  watch: {
    currentProjectName(nv) {
      if( nv && nv.length > 0 ) {
        this.$store.dispatch(ActionTypes.Projects.GetProjectData, nv);
      }
    }
  },

  computed: {
    currentProjectName() {
      return this.$store.state.ProjectView.CurrentProject;
    },
    editorOpen() {
      return this.$data.editorType !== '' && this.$data.editorElement !== ''
    },
    layoutBtnContent() {
      if( this.$data.twoThirdsMode ) {
        return [
          '&#189;',
          this.$t(this.$data.i18nDictionary.APP_50_50_LAYOUT)
        ]
      }
      return [
        '&#8532;',
        this.$t(this.$data.i18nDictionary.APP_30_70_LAYOUT)
      ]
    },
  },
  methods: {
    openEditor(evt: EditorEvent) {
      this.editorElement = evt.Element;
      this.editorType = evt.Type;
    },
    toggleTwoThirds() {
      this.twoThirdsMode = !this.twoThirdsMode;
    }
  }
})
</script>

<style scoped>

</style>