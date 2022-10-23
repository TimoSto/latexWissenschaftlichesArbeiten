import {MyState} from "@/store/MyState";
import {BibEntry} from "@/api/bibEntries/Entry";

export function UpdateEntry(state: MyState, entry: {Entry: BibEntry, initialKey: string}) {
    console.log(entry.initialKey)
    const i = state.ProjectView.CurrentProjectData.bibEntries.map(e => e.Key).indexOf(entry.initialKey)
    if( i === -1 ) {
        state.ProjectView.CurrentProjectData.bibEntries.push(entry.Entry);
    } else {
        state.ProjectView.CurrentProjectData.bibEntries[i] = entry.Entry;
    }

    state.ProjectView.CurrentProjectData.bibEntries.sort((a,b) => {
        return a.Key.toLowerCase() > b.Key.toLowerCase() ? 0 : -1
    })
}
