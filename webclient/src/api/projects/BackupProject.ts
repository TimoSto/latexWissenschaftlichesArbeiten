
export default async function BackupProject(project: string): Promise<Response>{
    return await fetch('/backup?project='+project, {
        method: 'POST'
    });
}