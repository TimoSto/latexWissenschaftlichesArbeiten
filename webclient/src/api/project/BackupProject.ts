
export default async function BackupProject(project: string): Promise<string>{
    let resp = await fetch('/backup?project='+project, {
        method: 'POST'
    });

    if( !resp.ok ) {
        return ''
    }

    return resp.text()
}