import {BibType} from "@/api/bibTypes/BibType";


export const state = {
    project: <string>'',
    projects: <string[]>[],
    bibTypes: <BibType[]>[]
};

export type State = typeof state;