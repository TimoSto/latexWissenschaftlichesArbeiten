import {ParseBibToString, ParseStringToTeX} from "@/api/TeX-JSON-converter/TeXParser";

type Entry = {
    ValuePairs: {Value: string, Attr: string}[];
    Key: string
    Typ: string
}

export default function AnalyseDroppedFiles(file: string): [boolean, string] {

    if(file.indexOf('@') == -1) {
        return [false, 'Die hochgeladene Datei hat ein ungültiges Format. Bitte stelle sicher, dass die hochgeladene Datei einen korrekten .bib-Syntax hat.']
    }

    //remove all linebreaks to have consistent format over all exports (Springer vs. IEEE vs. ...)
    file = file.replaceAll('\n', '');
    file = file.replaceAll('\r', '');

    const entries: Entry[] = [];

    const unknown = [];
    const empty = [];

    const regex = new RegExp(/(?!\B"[^"\\"]*),(?![^"\\"]*"\B)/g);

    while( file.indexOf('@') >= 0 ) {
        //remove stuff before first '@'
        file = file.substr(file.indexOf('@'));

        const nextEntryIndex = file.substr(1).indexOf('@');

        let entryFile = file.substr(0, nextEntryIndex >= 0 ? nextEntryIndex : file.length)

        //type = string between first '@' and first '{'
        const type = entryFile.substring(1, entryFile.indexOf('{')).toLowerCase();
        console.log(type)

        entryFile = entryFile.substr(entryFile.indexOf('{') + 1, entryFile.lastIndexOf('}') - 1)

        const key = entryFile.substr(0, entryFile.indexOf(','))
        entryFile = entryFile.substr(entryFile.indexOf(',') + 1)

        //TODO: kommas per regex

        // entryFile = entryFile.replaceAll(`\"`, '');
        // console.log(entryFile)

        const commasNotInsideQuotes = entryFile.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        const arr = [...commasNotInsideQuotes]
        console.log(arr)

        arr.forEach(vp => {
            const firstIndexOfEqual = vp.indexOf('=');
            let p1, p2;
            if ( firstIndexOfEqual > 0) {
                p1 = vp.substring(0, firstIndexOfEqual)
                p2 = vp.substring(firstIndexOfEqual + 1)
                p1 = RemoveTrailingAndLeading(p1, ' ');
                p2 = RemoveTrailingAndLeading(p2, ' ');
                p1 = RemoveTrailingAndLeading(p1, '"');
                p2 = RemoveTrailingAndLeading(p2, '"');
            }
            console.log(p1,p2)
        })

        file = nextEntryIndex >= 0 ? file.substr(nextEntryIndex) : '';
    }

    return [true, ' '];
}

function RemoveTrailingAndLeading(str: string, ch: string): string {
    while(str.charAt(0) === ch) {
        str = str.substr(1);
    }

    while(str.charAt(str.length - 1) === ch) {
        str = str.substr(0, str.length - 1);
    }

    return str
}

function AttrExists(valuepairs: string[][], attr: string): boolean {
    let found = false;
    valuepairs.forEach(pair => {
        if(pair[0] === attr) {
            found = true;
        }
    });
    return found
}
function SortValues(valuepairs: string[][], type: string):{Attr: string, Value: string}[] {
    const sortedPairs: {Attr: string, Value:string}[] = [];
    valuepairs.forEach(pair => {
        const index = getIndex(pair[0], type)
        if( index >= 0 ) {
            sortedPairs[index] = {Attr: pair[0], Value: pair[1]};
        }
    });
    return sortedPairs;
}

function getIndex(attr: string, type: string) {
    if (type == "citaviAufsatzDoi") {
        switch (attr) {
            case "author":
                return 0
            case "title":
                return 1
            case "journal":
                return 2
            case "volume":
                return 3
            case "pages":
                return 4
            case "year":
                return 5
            case "doi":
                return 6
        }
    } else if (type == "citaviAufsatz") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "journal":
                return 3
            case "volume":
                return 4
            case "pages":
                return 5
        }
    } else if (type == "citaviInbookDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "bookTitle":
                return 3
            case "publisher":
                return 4
            case "address":
                return 5
            case "doi":
                return 6
        }
    } else if (type == "citaviInProceedingsDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "doi":
                return 5
        }
    } else if (type == "citaviInProceedings") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "url":
                return 5
        }
    } else if (type == "citaviInCollectionDoi") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "publisher":
                return 5
            case "address":
                return 6
            case "doi":
                return 7
        }
    } else if (type == "citaviInCollection") {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "booktitle":
                return 3
            case "pages":
                return 4
            case "publisher":
                return 5
            case "address":
                return 6
        }
    } else if (type === 'citaviInbook') {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "isbn":
                return 3
            case "publisher":
                return 4
            case "doi":
                return 5
            case "editor":
                return 0
        }
    }else if (type === 'citaviInbookDoi') {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "isbn":
                return 3
            case "publisher":
                return 4
            case "editor":
                return 0
        }
    } else if (type === 'citaviBook') {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "isbn":
                return 3
            case "publisher":
                return 4
            case "address":
                return 5
            case "editor":
                return 0
        }
    } else if (type === 'citaviProceedings') {
        switch (attr) {
            case "publisher":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "address":
                return 3
        }
    } else if (type === 'citaviProceedingsDoi') {
        switch (attr) {
            case "publisher":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "doi":
                return 3
        }
    } else if (type === 'citaviThesis') {
        switch (attr) {
            case "author":
                return 0
            case "year":
                return 1
            case "title":
                return 2
            case "school":
                return 3
        }
    }
    return -1
}
