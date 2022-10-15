
export type ConfigSaveObj = {
    AutoOpenBrowser: boolean
    DarkMode: boolean
}

export default async function SaveConfig(obj: ConfigSaveObj) : Promise<boolean>{
    const data = JSON.stringify(obj);

    const resp = await fetch('/saveConfig', {
        method: 'POST',
        body: data
    });

    return resp.ok
}