import {ParseBibToString, ParseStringToTeX} from "./TeXParser";
import SaveEntry, {Entry, SaveEntries} from "./SaveEntry";

export default function AnalyseAndSaveDroppdFile(file: String, project: string, win: any) {

    if(file.indexOf('@') == -1) {
        win.openErrorDialog('Die Datei hat ein ungültiges Format.')
        return
    }

    //remove all linebreaks to have consistent format over all exports (Springer vs. IEEE vs. ...)
    file = file.replaceAll('\n', '');
    file = file.replaceAll('\r', '');

    let entries: Entry[] = [];

    let unknown = [];
    let empty = [];

    while( file.indexOf('@') >= 0 ) {
        //remove stuff before first '@'
        file = file.substr(file.indexOf('@'));

        let nextEntryIndex = file.substr(1).indexOf('@');

        let filepart = file

        if( nextEntryIndex >= 0) {//TODO: Warum hat das vorher funktioniert????
            filepart = file.substr(0, nextEntryIndex+1)
        }

        //type = string between first '@' and first '{'
        let type = filepart.substring(1, filepart.indexOf('{')).toLowerCase();

        //remove type and surrounding '{}'
        filepart = filepart.substring(file.indexOf('{') + 1, filepart.lastIndexOf('}'))

        //key ist string before first ',#
        let key = filepart.substring(0, filepart.indexOf(','));
        filepart = filepart.substring(filepart.indexOf(',') + 1);

        //parsing file to valuepairs
        let valuepairs = [];

        while( filepart.length > 0 && valuepairs.length < 30 ) {
            //attr-name ist string before '=' without leading or trailing spaces
            let attr = filepart.substring(0, filepart.indexOf('='))
            while( attr.charAt(0) === ' ' ) {
                attr = attr.substring(1);
            }
            while( attr.charAt(attr.length-1) === ' ' ) {
                attr = attr.substring(0, attr.length - 1);
            }
            filepart = filepart.substring(filepart.indexOf('=') + 1);

            //to find value: string until first comma when all brackets are closed
            let commaIndex;
            let openBrackets = 0;
            for( let i = 0 ; i < filepart.length && !commaIndex ; i++ ) {
                if( filepart.charAt(i) === ',' && openBrackets == 0 || i === filepart.length-1) {
                    commaIndex = i;
                } else if( filepart.charAt(i) === '{' ) {
                    openBrackets ++;
                } else if( filepart.charAt(i) === '}' ) {
                    openBrackets --;
                }
            }
            let value = filepart.substring(0,commaIndex);
            //remove possible leading and trailing spaces
            if( value.charAt(0) === ' ' ) {
                value = value.substring(1);
            }
            if( value.charAt(value.length-1) === ' ' ) {
                value = value.substring(0, value.length - 1);
            }
            //remove possible leading and trailing brackets
            let removedAtBeginning = 0
            let removedAtEnd = 0
            while( value.charAt(0) === '{' ) {
                value = value.substring(1);
                removedAtBeginning++;
            }
            while( value.charAt(value.length-1) === '}' && removedAtBeginning > removedAtEnd ) {
                value = value.substring(0, value.length - 1);
                removedAtEnd++
            }

            filepart = filepart.substring(commaIndex + 1)

            value = ParseBibToString(value);

            value = ParseStringToTeX(value);

            valuepairs.push([attr, value])
        }

        if( AttrExists(valuepairs, 'doi') ) {
            switch (type) {
                case "article":
                    type = "citaviAufsatzDoi"
                    break
                case "inbook":
                    type = "citaviInbookDoi"
                    break
                case "book":
                    type = "citaviBookDoi"
                    break
                case "inproceedings":
                    type = "citaviInProceedingsDoi"
                    break
                case "proceedings":
                    type = "citaviProceedingsDoi"
                    break
                case "incollection":
                    type = "citaviInCollectionDoi"
                    break
            }
        } else {
            switch (type) {
                case "article":

                    break
                case "inbook":

                    break
                case "book":
                    type = "citaviBook"
                    break
                case "inproceedings":

                    break
                case "proceedings":
                    type="citaviProceedings"
                    break
                case "incollection":
                    type = 'citaviInCollection'
                    break
                case "phdthesis":
                    type = 'citaviThesis'
                    break
            }
        }

        let sortedvaluepairs = SortValues(valuepairs, type);


        if( nextEntryIndex >= 0 ) {
            file = file.substr(nextEntryIndex);
        } else {
            file = '';
        }

        if( sortedvaluepairs.length === 0 ) {
            console.log('Empty fields or unknown type (key: ' + key+ ' type: ' + type + ')');
            if( valuepairs.length === 0 ) {
                empty.push(key)
            } else {
                unknown.push(type)
            }
            continue;
        }

        entries.push(new Entry(sortedvaluepairs, key, type))
    }

    win.openConfirmDialog(`Es werden ${empty.length + unknown.length} Einträge ignoriert:\n\nLeere Einträge: ${empty}\nUnbekannte Typen: ${unknown}\n\n${entries.length} Einträge hochladen?`, ()=>{
        SaveEntries(project, entries, win).then(valid => {
            if (valid) {
                win.reloadMain();
                win.setEdit('/editEntry?project='+project+'&entry='+entries[0].Key);
            } else {
                win.openErrorDialog('Beim Versuch, die Citavi-Quelle hochzuladen, ist ein Fehler aufgetreten.')
            }
        });
    })
}

function SortValues(valuepairs: string[][], type: string) {
    let sortedPairs = [];
    valuepairs.forEach(pair => {
        let index = getIndex(pair[0], type)
        if( index >= 0 ) {
            sortedPairs[index] = {Attr: pair[0], Value: pair[1]};
        }
    });
    return sortedPairs;
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
    } else if (type === 'citaviBookDoi') {
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