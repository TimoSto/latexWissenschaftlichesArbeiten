<template>
  <div id="configView">
    <v-app-bar
      dense
      color="background"
      elevate-on-scroll
      >

      <v-toolbar-title>{{$t(i18nDictionary.Config.Title)}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon :disabled="!saveNecessary" @click="saveConfig">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet class="content-below-two-bars" style="padding: 8px 16px;">
      <v-checkbox
          v-model="darkMode"
          :label="$t(i18nDictionary.Config.DarkMode)"
          class="shrink mr-0 mt-0"
      />
      <v-checkbox
          v-model="autoOpenBrowser"
          :label="$t(i18nDictionary.Config.AutoOpen)"
          class="shrink mr-0 mt-0"
      />
    </v-sheet>
  </div>
</template>

<script>
import {i18nDictionary} from "@/i18n/Keys";
import ActionTypes from "@/store/ActionTypes";

export default {
  name: "ConfigView",
  data() {
    return {
      i18nDictionary: i18nDictionary,
      autoOpenBrowser: false,
      darkMode: false,
      initialsLoaded: false
    }
  },

  mounted() {
    this.$nextTick(()=> {
      if( this.$store.state.App.Loaded ) {
        this.initialsLoaded = true;
        this.autoOpenBrowser = this.$store.state.App.Config.AutoOpenBrowser === true;
        this.darkMode = this.$store.state.App.Config.DarkMode;
      }
    })
  },

  watch: {
    Loaded(v) {
      if( !this.initialsLoaded ) {
        this.initialsLoaded = true;
        this.autoOpenBrowser = this.$store.state.App.Config.AutoOpenBrowser === true;
        this.darkMode = this.$store.state.App.Config.DarkMode;
      }
    }
  },

  computed: {
    initialValues() {
      return this.$store.state.App.Config
    },
    saveNecessary() {
      return this.initialsLoaded && (this.autoOpenBrowser !== this.initialValues.AutoOpenBrowser ||
          this.darkMode !== this.initialValues.DarkMode);
    },
    Loaded() {
      return this.$store.state.App.Loaded;
    }
  },

  methods: {
    saveConfig() {
      this.$store.dispatch(ActionTypes.App.SaveConfig, {
        AutoOpenBrowser: this.autoOpenBrowser,
        DarkMode: this.darkMode
      });

      this.$vuetify.theme.dark = this.darkMode;
    }
  }
}
</script>

<style scoped>

</style>