
export type MyState = {
    app: {
        projectNames: string [],
        currentProjectName: string
        error: {
            type: string//e.g. server interaction or tex-parsing
            message: string//Stadnard-Text hinterher
        }
    }
}

export const myState: MyState = {

    app: {
        projectNames: ['te'],
        currentProjectName: '',
        error: {
            type: '',
            message: ''
        }
    }
}