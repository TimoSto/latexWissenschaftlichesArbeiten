export default async function CleanupCites(project: string): Promise<Response> {
    return await fetch('/citeCleanup?project=' + project, {
        method: 'POST'
    });
}