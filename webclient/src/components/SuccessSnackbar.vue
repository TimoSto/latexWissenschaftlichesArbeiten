<template>
  <v-snackbar :value="value">
    <span>
      {{message}}
    </span>

    <v-progress-linear
        absolute
        bottom
        :value="Math.floor(100 * (currentTime / timeout))"
    />
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import MutationTypes from "../store/MutationTypes";
import VueI18n from "vue-i18n";

export default Vue.extend({
  name: "SuccessSnackbar",
  props: {
    timeout: {
      default: 5 * 1000,
    },
  },
  data() {
    return {
      currentTime: 0,
    };
  },
  methods: {
    syncPbar() {
      //Create a timeout every 100 miliseconds
      setTimeout(() => {
        //Increment the time counter by 100
        this.currentTime += 100;

        //If our current time is larger than the timeout
        if (this.timeout <= this.currentTime) {

          //Wait 500 miliseconds for the dom to catch up, then reset the snackbar
          setTimeout(() => {
            this.currentTime = 0; // reset the current time
            this.$store.commit(MutationTypes.App.SetSuccessMessage, '')
          }, 500);
        } else {
          //Recursivly update the progress bar
          this.syncPbar();
        }
      }, 100);
    }
  },
  watch: {
    value(v) {
      if (v) {
        //TODO: reset time on change
        this.currentTime = 0;
        this.syncPbar();
      }
    }
  },
  computed: {
    value(): boolean {
      return this.$store.state.App.SuccessMessage !== '';
    },
    message(): VueI18n.TranslateResult {
      return this.$t(this.$store.state.App.SuccessMessage)
    }
  }
})
</script>

<style scoped>

</style>