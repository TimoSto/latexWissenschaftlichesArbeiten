
export async function DeleteType(type: string, project: string) {
    const resp = await fetch(`/deleteType?project=${project}&type=${type}`, {
        method: 'DELETE'
    });

    return resp.ok;
}