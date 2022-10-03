
export default async function DeleteType(project: string, name: string): Promise<boolean> {
    const resp = await fetch(`/deleteType?project=${project}&type=${name}`, {
        method: 'POST'
    });

    return resp.ok;
}