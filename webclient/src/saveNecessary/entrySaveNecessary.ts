import {MyState} from "@/store/MyState";

export default function EntrySaveNecessary(state: MyState, index: number, key: string, category: string, fields: string[]) {
    if( index === -1 ) return true

    return key !== state.ProjectView.CurrentProjectData.bibEntries[index].Key ||
        category !== state.ProjectView.CurrentProjectData.bibEntries[index].Typ ||
        JSON.stringify(fields) !== JSON.stringify(state.ProjectView.CurrentProjectData.bibEntries[index].Fields);
}
