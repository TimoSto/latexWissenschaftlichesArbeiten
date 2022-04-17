
export default function SaveEntry(initialKey: string, project: string, valuePairs: {Value: string, Attr: string}[], typ: string, key: string, comment: string) {
    let obj = {
        Entry: {
            InitialKey: initialKey,
            ValuePairs: valuePairs,
            Typ: typ,
            Key: key,
            Comment: comment
        },
        Project: project
    }
    return window.fetch('/saveEntry', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {

        if( response.status === 200 ) {
            document.body.setAttribute('data-key', valuePairs[0].Value)
            return true
        }
    });
}

export class Entry {
    InitialKey: string;
    ValuePairs: {Value: string, Attr: string}[];
    Key: string
    Comment: string
}

export function SaveEntries(project: string, entries: Entry[] ) {

}