import {BibEntry} from "@/api/bibEntries/Entry";
import {BibType} from "@/api/bibTypes/BibType";
import {ParseTeXToString} from "@/api/bibEntries/ParseTeXString";
import GeneratePreviewsForBibEntry from "@/api/bibEntries/GeneratePreviewsForBibEntry";

export default function ParseEntryToString(entry: BibEntry, type: BibType): BibEntry {
    const bibFieldNames = type.Fields.map(f => f.Field);
    const citeFields = type.CiteFields.filter(f => bibFieldNames.indexOf(f.Field) === -1);

    entry.Fields.forEach((f:string, j: number) => {
        if( j < type.Fields.length ) {
            if( !type.Fields[j].TexValue ) {
                entry.Fields[j] = ParseTeXToString(f)
            }
        } else {
            if( !citeFields[j - bibFieldNames.length].TexValue ) {
                entry.Fields[j] = ParseTeXToString(f)
            }
        }
    })

    const previews = GeneratePreviewsForBibEntry(type.Fields, type.CiteFields, entry.Fields)
    entry.BibPreview = previews[0];
    entry.CitePreview = previews[1];

    return entry;
}