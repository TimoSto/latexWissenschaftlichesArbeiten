import {BibType} from "@/api/bibType/BibType";
import {BibEntry} from "@/api/bibEntry/BibEntry";
import {Abbreviation} from "@/api/abbreviations/Abbreviation";

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
        twoThirdsActive: boolean,
        config: {
            openBrowser: boolean,
            overrideEntries: boolean
        }
    },
    project: {
        backupPaths: string[],
        bibTypes: BibType[],
        bibEntries: BibEntry[],
        abbreviations: Abbreviation[]
    },
    editor: {
        type: string,
        key: string,
        indexOfEdited: number
        savelyClosable: boolean
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
        twoThirdsActive: false,
        config: {
            openBrowser: false,
            overrideEntries: true
        }
    },
    project: {
        backupPaths: [],
        bibTypes: [],
        bibEntries: [],
        abbreviations: []
    },
    editor: {
        type: '',
        key: '',
        indexOfEdited: -1,
        savelyClosable: true
    }
}