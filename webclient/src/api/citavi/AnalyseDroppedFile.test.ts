import AnalyseDroppedFile from "@/api/citavi/AnalyseDroppedFile";
import {BibType} from "@/api/bibType/BibType";

describe('AnalyseDropped', ()=> {
    it('should give one entry width file without indents or prescating', ()=> {
        const file = `@inbook{TestEintrag,
author="Mein Autor",
title={"Main Titel"},
}
        `

        const types: BibType[] = [
            {
                Name: 'ib',
                CitaviType: 'inbook',
                CitaviNecessaryFields: [],
                Fields: [
                    {
                        Field: 'Autor',
                        Style: 'normal',
                        Prefix: '',
                        Suffix: '',
                        CitaviAttributes: ['author'] as string[],
                        TexValue: false
                    }
                ],
                CiteFields: [],
                CiteModel: '',
                Model: ''
            }
        ]


        const result = AnalyseDroppedFile(file, types)

        expect(result.Entries.length).toEqual(1)
        expect(result.Entries[0].Fields).toEqual(['Mein Autor'])
    })

    it('should give one entry width file with indents or prescating', ()=> {
        const file = `%Test\n@inbook{TestEintrag,\n\tauthor="Mein Autor",\n\ttitle={"Main Titel"}}`

        const types: BibType[] = [
            {
                Name: 'ib',
                CitaviType: 'inbook',
                CitaviNecessaryFields: [],
                Fields: [
                    {
                        Field: 'Autor',
                        Style: 'normal',
                        Prefix: '',
                        Suffix: '',
                        CitaviAttributes: ['author'] as string[],
                        TexValue: false
                    }
                ],
                CiteFields: [],
                CiteModel: '',
                Model: ''
            }
        ]


        const result = AnalyseDroppedFile(file, types)

        console.log(result.Entries[0].Fields)

        expect(result.Entries.length).toEqual(1)
        expect(result.Entries[0].Fields).toEqual(['Mein Autor'])
    })
})