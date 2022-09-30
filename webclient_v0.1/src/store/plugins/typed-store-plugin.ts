import Vue, { PluginObject } from "vue";
import { Store } from "../store";


declare module "vue/types/vue" {
    interface Vue {
        $vStore: Store;
    }
}

export const TypedStorePlugin: PluginObject<void> = {
    install(VueInstance: typeof Vue) {
        Object.defineProperty(VueInstance.prototype, '$vStore', {
            get() {
                return this.$store;
            }
        });
    }
};