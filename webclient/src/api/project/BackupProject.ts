
export default async function BackupProject(project: string): Promise<string>{
    const resp = await fetch('/backup?project='+project, {
        method: 'POST'
    });

    if( !resp.ok ) {
        return ''
    }

    return resp.text()
}