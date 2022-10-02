import {BibType} from "@/api/bibType/BibType";
import {BibEntry} from "@/api/bibEntry/BibEntry";

export type MyState = {
    app: {
        projectNames: string [],
        currentProjectName: string
        error: {
            type: string//e.g. server interaction or tex-parsing
            message: string//Stadnard-Text hinterher
        },
        successMessage: string
        deletedProject: string
    },
    project: {
        backupPaths: string[],
        bibTypes: BibType[],
        bibEntries: BibEntry[],
    }
}

export const myState: MyState = {

    app: {
        projectNames: [],
        currentProjectName: '',
        error: {
            type: '',
            message: ''
        },
        successMessage: '',
        deletedProject: ''
    },
    project: {
        backupPaths: [],
        bibTypes: [],
        bibEntries: []
    }
}