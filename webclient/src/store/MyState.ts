
export type MyState = {
    App: {
        CurrentView: string
        ProjectNames: string[]
    },
    ProjectView : {
        CurrentProject: string
    }
}

export const MyStateObj: MyState = {
    App: {
        CurrentView: 'home',
        ProjectNames: []
    },
    ProjectView: {
        CurrentProject: ''
    }
}
