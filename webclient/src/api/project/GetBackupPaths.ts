
export default async function GetBackupPaths(project: string): Promise<{ success: boolean, paths: string[] }> {
    const resp = await fetch('/getBackups?project=' + project)

    if( !resp.ok ) {
        return {
            success: false,
            paths: []
        }
    }

    const data = await resp.json()

    return {
        success:true,
        paths: data.Paths
    }
}