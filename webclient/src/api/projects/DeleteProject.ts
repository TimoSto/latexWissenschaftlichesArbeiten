
export default async function DeleteProject(name: string) : Promise<boolean>{
    const resp = await fetch('/deleteProject?project=' + name);

    return resp.ok
}