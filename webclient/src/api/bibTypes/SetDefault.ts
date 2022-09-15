export default async function SetDefault(project: string): Promise<Response> {
    return await fetch('/setDefault?project=' + project, {
        method: 'POST'
    });
}