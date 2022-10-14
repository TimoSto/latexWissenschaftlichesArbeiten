
type AppData = {
    Projects: string[]
    Error: boolean
}

export default async function ReadAppData(): Promise<AppData> {
    const resp = await fetch('/getAppData');

    if( !resp.ok ) {
        return {
            Projects: [],
            Error: true
        }
    }

    return await resp.json()

}
