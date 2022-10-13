import ConfigObj from "@/api/config/ConfigObj";

export default async function ReadConfig(): Promise<ConfigObj> {
    const resp = await fetch('/config');

    if( !resp.ok ) {
        return <ConfigObj>{
            AutoOpenBrowser: false,
            OverrideExistingEntries: true
        }
    }

    return await resp.json()
}