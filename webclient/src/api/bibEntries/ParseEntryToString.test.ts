import ParseEntryToString from "@/api/bibEntries/ParseEntryToString";

describe('ParseEntryToString', () => {
    it('with fields', () => {
        const testType = {
            Name: 'test',
            Fields: [
                {
                    Field: 't',
                    Style: 'normal',
                    Prefix: '',
                    Suffix: ', ',
                    TexValue: false,
                    CitaviAttributes: []
                },
                {
                    Field: 't2',
                    Style: 'italic',
                    Prefix: '(',
                    Suffix: ').',
                    TexValue: false,
                    CitaviAttributes: []
                },
            ],
            CiteFields: [],
            Model: '',
            CiteModel: '',
            CitaviType: '',
            CitaviNecessaryFields: []
        }
        const testEntry = {
            Typ: 'test',
            Fields: ['teste{{\\_}}es', 'du'],
            Key: 'te',
            CiteNumber: 0,
            BibPreview: '',
            CitePreview: ''
        }
        const parsed = ParseEntryToString(testEntry, testType)

        expect(parsed.Fields[0]).toEqual('teste_es')
        expect(parsed.Fields[1]).toEqual('du')
    })
})