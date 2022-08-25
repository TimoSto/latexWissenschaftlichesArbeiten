import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/BibEntry";


export const state = {
    project: <string>'',
    projects: <string[]>[],
    bibTypes: <BibType[]>[],
    bibEntries: <BibEntry[]>[],
    typeToEdit: <string>'',
    initialType: <BibType>{}
};

export type State = typeof state;