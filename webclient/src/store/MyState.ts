
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
        CurrentProject: string
    }
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
        CurrentProject: ''
    }
}
