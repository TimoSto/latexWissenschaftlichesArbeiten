import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";
import {DragNDropResp, Entry} from "@/api/TeX-JSON-converter/AnalyseDroppedFiles";


export const state = {
    project: <string>'',
    projects: <string[]>[],
    bibTypes: <BibType[]>[],
    bibEntries: <BibEntry[]>[],
    typeToEdit: <BibType>{},
    initialType: <BibType>{},
    entryToEdit: <BibEntry>{},
    initialEntry: <BibEntry>{},
    twoThirdsActive: false,
    initialInput: false,
    errorMessage: '',
    snackbarMessage: '',
    dragNDropResp: <DragNDropResp>{
        Message: '',
        Entries: <Entry[]>[],
        Valid: false,
        Unknown: [],
        Empty: []
    },
    richEditorOpened: false
};

export type State = typeof state;