
export default function SaveEntry(initialKey: string, valuePairs: {Value: string, Attr: string}[], typ: string, key: string) {
    let obj = {
        InitialKey: initialKey,
        ValuePairs: valuePairs,
        Typ: typ,
        Key: key,
    }
    document.body.setAttribute('data-key', valuePairs[0].Value)
    return window.fetch('/saveEntry', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {
        console.log(response);
        if( response.status === 200 ) {
            return true
        }
    });
}