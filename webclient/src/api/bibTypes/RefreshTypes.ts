export default async function RefreshTypes(project: string): Promise<Response> {
    return await fetch('/refreshTypes?project=' + project, {
        method: 'POST'
    });
}