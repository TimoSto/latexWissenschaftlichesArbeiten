export default async function ResetDefaultTypes(project: string): Promise<Response> {
    return await fetch('/refreshTypes?project=' + project, {
        method: 'POST'
    });
}