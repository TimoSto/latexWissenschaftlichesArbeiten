
export default async function ResetToBackup(project: string, backup: string): Promise<boolean> {
    const resp = await fetch('/resetToBackup', {
        method: 'POST',
        body: JSON.stringify({
            Project: project,
            Backup: backup
        })
    });

    return resp.ok
}
