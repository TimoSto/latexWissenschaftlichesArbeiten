
export type MyState = {
    app: {
        projectNames: string [],
        currentProjectName: string
        error: {
            type: string//e.g. server interaction or tex-parsing
            message: string//Stadnard-Text hinterher
        },
        successMessage: string
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
        successMessage: ''
    }
}