
export default async function CreateProject(name: string): Promise<boolean> {
    const resp = await fetch('/createProject', {
        method: 'POST',
        body: JSON.stringify({Name: name})
    })

    return resp.ok
}