
export default async function DeleteProject(project: string): Promise<boolean> {
    const resp = await(fetch(`/deleteProject?project=${project}`))

    return resp.ok;
}