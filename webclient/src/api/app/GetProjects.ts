export default async function GetProjects(): Promise<string[]> {
    const resp = await fetch('/getProjects');

    if( !resp.ok ) {
        return []
    }

    const obj = await resp.json();

    return obj
}