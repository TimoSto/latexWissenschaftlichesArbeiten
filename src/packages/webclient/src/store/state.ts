import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";
import {DragNDropResp} from "@/api/TeX-JSON-converter/AnalyseDroppedFiles";


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
    errorMessage: '',
    snackbarMessage: '',
    dragNDropResp: <DragNDropResp>{
        Message: ''
    }
};

export type State = typeof state;