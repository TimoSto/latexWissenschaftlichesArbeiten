
export default async function CreateBackup(project: string): Promise<boolean> {
    const resp = await fetch(`/createBackup?project=${project}`, {
        method: 'POST'
    })
    //TODO: return path to backup

    return resp.ok;
}
