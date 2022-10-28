
export default async function CreateBackup(project: string): Promise<Response> {
    const resp = await fetch(`/createBackup?project=${project}`, {
        method: 'POST'
    })

    return resp;
}
