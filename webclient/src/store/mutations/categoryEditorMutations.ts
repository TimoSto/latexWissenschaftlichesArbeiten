import {MyState} from "@/store/MyState";

export function RemoveType(state: MyState, name: string) {
    const i = state.ProjectView.CurrentProjectData.bibTypes.map(t => t.Name).indexOf(name);
    if( i >= 0 ) {
        state.ProjectView.CurrentProjectData.bibTypes.splice(i, 1)
    }
}