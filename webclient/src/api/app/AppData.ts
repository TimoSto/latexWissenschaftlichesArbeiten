
type AppData = {
    Projects: string[]
    Config: {
        AutoOpenBrowser: boolean
        DarkMode: boolean
        Port: string
    }
    Error: boolean
}

export default async function ReadAppData(): Promise<AppData> {
    const resp = await fetch('/getAppData');

    if( !resp.ok ) {
        return {
            Projects: [],
            Config: {
                AutoOpenBrowser: false,
                DarkMode: false,
                Port: ''
            },
            Error: true
        }
    }

    return await resp.json()

}
