import {MyState} from "@/store/MyState";
import {BibEntry} from "@/api/bibEntries/Entry";
import {ParseTeXToString} from "@/api/bibEntries/ParseTeXString";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";
import {BibType} from "@/api/bibTypes/BibType";

export function UpdateEntry(state: MyState, entry: {Entry: BibEntry, initialKey: string}) {
    const i = state.ProjectView.CurrentProjectData.bibEntries.map(e => e.Key).indexOf(entry.initialKey)
    entry.Entry.Fields.forEach((f: string, i: number) => {
        entry.Entry.Fields[i] = ParseTeXToString(f);
    });

    const bType = state.ProjectView.CurrentProjectData.bibTypes.find((t: BibType) => t.Name === entry.Entry.Typ);
    if( bType ) {
        const previews = GeneratePreviewsForBibEntry(bType.Fields, bType.CiteFields, entry.Entry.Fields);
        entry.Entry.BibPreview = previews[0];
        entry.Entry.CitePreview = previews[1];
    }

    if( i === -1 ) {
        state.ProjectView.CurrentProjectData.bibEntries.push(entry.Entry);
    } else {
        state.ProjectView.CurrentProjectData.bibEntries[i] = entry.Entry;
    }

    state.ProjectView.CurrentProjectData.bibEntries.sort((a,b) => {
        return a.Key.toLowerCase() > b.Key.toLowerCase() ? 0 : -1
    })
}

export function RemoveEntry(state: MyState, key: string) {
    const i = state.ProjectView.CurrentProjectData.bibEntries.map(e => e.Key).indexOf(key);
    if( i >= 0 ) {
        state.ProjectView.CurrentProjectData.bibEntries.splice(i, 1)
    }
}
