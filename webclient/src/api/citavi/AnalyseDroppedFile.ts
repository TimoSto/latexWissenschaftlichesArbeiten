import {BibType} from "@/api/bibType/BibType";
import {BibEntry} from "@/api/bibEntry/BibEntry";
import GeneralizeTeXEscaping from "@/api/citavi/ParseBibValues";

export default function AnalyseDroppedFile(file: string, types: BibType[]): {Entries: BibEntry[], Unknown: string[]} {

    const entriesToUpload: BibEntry[] = []

    const ignoredEntries: string[] = []

    file = file.substring(file.indexOf('@'))

    //step 1: split att @ at beginning of line
    const entries = file.split(/^@/gm).filter(e => e.length > 0);

    entries.forEach(e => {

        //step 2: bewteen @ and first { is typename
        const citaviType = e.substring(0, e.indexOf('{'))

        //step 3: find associated type
        let typeToUse: BibType = {
            Name: '',
            Fields: [],
            CiteFields: [],
            CitaviType: '',
            CiteModel: '',
            Model: '',
            CitaviNecessaryFields: []
        };

        for(let i = 0; i < types.length ; i++) {
            if( types[i].CitaviType.toLowerCase() === citaviType.toLowerCase() ) {
                typeToUse = types[i];
            }
        }

        if(typeToUse.Name !== '') {

            //step 4: setup entry obj
            const entry: BibEntry = {
                Key: '',
                Typ: typeToUse.Name,
                Fields: [] as string[],
                CiteNumber: 0,
                BibPreview: '',
                CitePreview: ''
            }

            typeToUse.Fields.forEach(f => {
                entry.Fields.push(f.Field)//important for step 9 to set field names
            });

            const bibFields = typeToUse.Fields.map(f => f.Field);

            typeToUse.CiteFields.forEach(f => {
                if( bibFields.indexOf(f.Field) === -1 ) {
                    entry.Fields.push(f.Field)
                }
            });

            //step 4: only have arguments
            e = e.substring(e.indexOf('{') + 1, e.lastIndexOf('}'));

            //step 5: rm all newlines and indents to be equal in all export formats (springer vs ieee vs ...)
            e = e.replaceAll('\n', '');
            e = e.replaceAll('\t', '');

            //step 6: split at comma not in quotes
            const re = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
            const lines = e.split(re);
            console.log(lines)

            //step 7: key is first element inside citavi-entry
            entry.Key = lines[0];

            //step 8: check all lines for attributes
            lines.slice(1).forEach(l => {
                const eqIndex = l.indexOf('=');
                if( eqIndex > 0 ) {
                    const attr = l.substring(0, eqIndex);
                    typeToUse.Fields.forEach(f => {
                        let i = f.CitaviAttributes.indexOf(attr);

                        //step 9: if attr is in citavi-attr-array of field, replace fieldname in entry.Fields, this way this only happens once
                        if (i > -1 ) {
                            i = entry.Fields.indexOf(f.Field)
                            if (i > -1 ) {
                                entry.Fields[i] = GeneralizeTeXEscaping(l.substring(eqIndex + 1))
                            }
                        }

                    });
                    //citavi-attributes only appearing in cite-fields are unnecessary
                }
            });

            entriesToUpload.push(entry);
        } else {
            ignoredEntries.push(citaviType)//TODO: also give key
        }
    });

    return {
        Entries: entriesToUpload,
        Unknown: ignoredEntries
    }
}