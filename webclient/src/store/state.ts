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
        twoThirdsActive: boolean
    },
    project: {
        backupPaths: string[],
        bibTypes: BibType[],
        bibEntries: BibEntry[],
    },
    editor: {
        type: string,
        key: string,
        indexOfEdited: number
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
        deletedProject: '',
        twoThirdsActive: false
    },
    project: {
        backupPaths: [],
        bibTypes: [],
        bibEntries: []
    },
    editor: {
        type: '',
        key: '',
        indexOfEdited: -1
    }
}