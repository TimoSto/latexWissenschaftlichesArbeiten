import {MyState} from "@/store/MyState";
import {BibType} from "@/api/bibTypes/BibType";

export function RemoveType(state: MyState, name: string) {
    const i = state.ProjectView.CurrentProjectData.bibTypes.map(t => t.Name).indexOf(name);
    if( i >= 0 ) {
        state.ProjectView.CurrentProjectData.bibTypes.splice(i, 1)
    }
}

export function UpdateType(state: MyState, type: {Type: BibType, initialName: string}) {
    const i = state.ProjectView.CurrentProjectData.bibTypes.map(t => t.Name).indexOf(type.initialName)
    if( i === -1 ) {
        state.ProjectView.CurrentProjectData.bibTypes.push(type.Type);
    } else {
        state.ProjectView.CurrentProjectData.bibTypes[i] = type.Type;
    }

    state.ProjectView.CurrentProjectData.bibTypes.sort((a,b) => {
        return a.Name.toLowerCase() > b.Name.toLowerCase() ? 0 : -1
    })
}
