import {MyState} from "@/store/MyState";

export function SetCurrentView(state: MyState, view: string) {
    state.App.CurrentView = view;
}