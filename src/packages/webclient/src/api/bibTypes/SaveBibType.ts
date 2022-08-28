export default async function SaveType(obj: string): Promise<Response> {

    return  await fetch('/saveType', {
        method: 'POST',
        body: obj
    })
}