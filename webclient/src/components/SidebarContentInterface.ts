import Vue from "vue";

export interface SidebarContentInterface extends Vue {
    toInfo(): void;
    toItem(n: number): void;
}