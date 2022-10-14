
export type MyState = {
    App: {
        CurrentView: string
        ProjectNames: string[]
    }
}

export const MyStateObj: MyState = {
    App: {
        CurrentView: 'home',
        ProjectNames: []
    }
}
