
export default async function DeleteEntry(project: string, key: string): Promise<boolean> {
    const resp = await fetch(`/deleteEntry?project=${project}&entry=${key}`, {
        method: 'DELETE'
    });

    return resp.ok
}
