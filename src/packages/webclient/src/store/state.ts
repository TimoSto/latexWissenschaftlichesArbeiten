import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";


export const state = {
    project: <string>'',
    projects: <string[]>[],
    bibTypes: <BibType[]>[],
    bibEntries: <BibEntry[]>[],
    typeToEdit: <BibType>{},
    initialType: <BibType>{},
    entryToEdit: <BibEntry>{},
    initialEntry: <BibEntry>{},
    twoThirdsActive: false
};

export type State = typeof state;