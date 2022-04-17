
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
    console.log(JSON.stringify(obj))
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
    ValuePairs: {Value: string, Attr: string}[];
    Key: string
    Typ: string
    Comment: string

    constructor(vps: {Value: string, Attr: string}[], key: string, typ: string) {
        this.ValuePairs = vps;
        this.Key = key;
        this.Typ = typ;
    }
}

export function SaveEntries(project: string, entries: Entry[] ) {
    let obj = {
        Entries: entries,
        Project: project
    }
    return window.fetch('/uploadEntries', {
        method: 'POST',
        body: JSON.stringify(obj)
    }).then(response => {

        if( response.status === 200 ) {
            //document.body.setAttribute('data-key', valuePairs[0].Value)
            return true
        }
    });
}