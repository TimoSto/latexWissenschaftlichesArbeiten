
export default async function ResetToBackup(project: string, backup: string): Promise<boolean> {
    const resp = await fetch(`/resetToBackup?project=${project}&backup=${backup}`);

    return resp.ok
}
