import {BibType} from "@/api/bibTypes/BibType";
import {BibEntry} from "@/api/bibEntries/Entry";
import {Abbreviation} from "@/api/abbreviations/Abbreviation";

export type MyState = {
    App: {
        CurrentView: string
        ProjectNames: string[]
        Config: {
            AutoOpenBrowser: boolean
            DarkMode: boolean
            Port: string
        },
        Loaded: boolean
    },
    ProjectView : {
        CurrentProject: string,
        CurrentProjectData: {
            backupPaths: string[],
            bibTypes: BibType[],
            bibEntries: BibEntry[],
            abbreviations: Abbreviation[]
        },
        EditorCloseNeeded: boolean,
        EditorIndexUpdate: number
    },
}

export const MyStateObj: MyState = {
    App: {
        CurrentView: 'home',
        ProjectNames: [],
        Config: {
            AutoOpenBrowser: false,
            DarkMode: false,
            Port: ''
        },
        Loaded: false
    },
    ProjectView: {
        CurrentProject: '',
        CurrentProjectData: {
            backupPaths: [],
            bibTypes: [],
            bibEntries: [],
            abbreviations: []
        },
        EditorCloseNeeded: false,
        EditorIndexUpdate: -1
    }
}
