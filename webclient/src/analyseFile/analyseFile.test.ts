import {
    AttributeValue, CreateEntry,
    extractEntryAttributes,
    extractKey,
    findBibliographyType,
    getTypeOfEntry,
    separateEntries
} from "@/analyseFile/analyseFile";
import {BibType, Field} from "@/api/bibTypes/BibType";

describe('analyseFile', () => {

    describe('separateEntries', () => {
        it('should give one', () => {
            const file = `
@book{
field1="hallo",
field2="@test"
}`;
            expect(separateEntries(file)).toHaveLength(1);
        })
        it('should give two', () => {
            const file = `
@book{
field1="hallo",
field2="@test"
}
@wer{
field1="werlo",
field2="werest"
}`;
            expect(separateEntries(file)).toHaveLength(2);
        })
        it('should give two', () => {
            const file = `
@book{
    field1="hallo",
    field2="@test"
}

@wer{
field1="werlo",
field2="werest"
}`;
            expect(separateEntries(file)).toHaveLength(2);
        })
    });

    describe('getTypeOfEntry', () => {
        it('should give book', () => {
            expect(getTypeOfEntry('@book{\n\tt="hallo\n"}')).toEqual('book')
        })
        it('should give book', () => {
            expect(getTypeOfEntry('book{\n\tt="hallo\n"}')).toEqual('book')
        })
    });

    describe('extractKey', () => {
        it('should give test', () => {
            expect(extractKey('@book{test,a1="rotoe"}')).toEqual('test')
        })
        it('should give test', () => {
            expect(extractKey('@book{test,\na1="rotoe"}')).toEqual('test')
        })
        it('should give test', () => {
            expect(extractKey('@book{\ttest,a1="rotoe"}')).toEqual('test')
        })
    })

    describe('extracting attributes and values', () => {
        it('should work for unescaped', () => {
            expect(extractEntryAttributes('{herbert,test="hallo",rudi="sommer"}')).toEqual([
                {
                    Attribute: 'test',
                    Value: 'hallo'
                },
                {
                    Attribute: 'rudi',
                    Value: 'sommer'
                }
            ])
        })
        it('should work for escaped', () => {
            expect(extractEntryAttributes('{herbert,test={"hallo"},rudi="sommer"}')).toEqual([
                {
                    Attribute: 'test',
                    Value: 'hallo'
                },
                {
                    Attribute: 'rudi',
                    Value: 'sommer'
                }
            ])
        })
    })

    describe('findBibType', () => {
        it('should give book', () => {
            const aTypes = [
                {
                    Name: 'random1',
                    CitaviNecessaryFields: []
                },
                {
                    Name: 'buch',
                    CitaviType: 'book',
                    CitaviNecessaryFields: []
                },
                {
                    Name: 'random2',
                    CitaviNecessaryFields: ['doi']
                },
            ];
            expect(findBibliographyType('book', [{Attribute: 'doi', Value: '/teste/123'}], aTypes as unknown as BibType[]).Name).toEqual('buch')
        })
        it('should give buchDoi', () => {
            const aTypes = [
                {
                    Name: 'random1',
                    CitaviNecessaryFields: []
                },
                {
                    Name: 'buch',
                    CitaviType: 'book',
                    CitaviNecessaryFields: []
                },
                {
                    Name: 'buchDoi',
                    CitaviType: 'book',
                    CitaviNecessaryFields: ['doi']
                },
                {
                    Name: 'random2',
                    CitaviNecessaryFields: ['doi']
                },
            ];
            expect(findBibliographyType('book', [{Attribute: 'doi', Value: '/teste/123'}], aTypes as unknown as BibType[]).Name).toEqual('buchDoi')
        })
    });

    describe('createEntry', () => {
        it('should give correct with only bibfields', () => {
            const t: BibType = {
                Name: 't1',
                CitaviType: 'book',
                CitaviNecessaryFields: [],
                Fields: [
                    {
                        Field: 'f1',
                        CitaviAttributes: ['cf1'],
                    } as Field,
                    {
                        Field: 'f2',
                        CitaviAttributes: ['cf2'],
                    } as Field,
                    {
                        Field: 'f3',
                        CitaviAttributes: ['cf3'],
                    } as Field,
                ],
                CiteFields: [],
                Model: '',
                CiteModel: ''
            };
            const attributes: AttributeValue[] = [
                {
                    Attribute: 'cf2',
                    Value: 'test 1'
                },
                {
                    Attribute: 'cf1',
                    Value: 'test 2'
                },
                {
                    Attribute: 'cf3',
                    Value: 'test 3'
                }
            ];
            const entry = CreateEntry(t, attributes, 'testkey');
            expect(entry.Key).toEqual('testkey');
            expect(entry.Typ).toEqual('t1');
            expect(entry.Fields).toEqual(['test 2', 'test 1', 'test 3'])
        })
        it('should give correct with additional citefields', () => {
            const t: BibType = {
                Name: 't1',
                CitaviType: 'book',
                CitaviNecessaryFields: [],
                Fields: [
                    {
                        Field: 'f1',
                        CitaviAttributes: ['cf1'],
                    } as Field,
                    {
                        Field: 'f2',
                        CitaviAttributes: ['cf2'],
                    } as Field,
                    {
                        Field: 'f3',
                        CitaviAttributes: ['cf3'],
                    } as Field,
                ],
                CiteFields: [
                    {
                        Field: 'f4',
                        CitaviAttributes: ['cf4'],
                    } as Field,
                ],
                Model: '',
                CiteModel: ''
            };
            const attributes: AttributeValue[] = [
                {
                    Attribute: 'cf2',
                    Value: 'test 1'
                },
                {
                    Attribute: 'cf4',
                    Value: 'test 4'
                },
                {
                    Attribute: 'cf3',
                    Value: 'test 3'
                }
            ];
            const entry = CreateEntry(t, attributes, 'testkey');
            expect(entry.Key).toEqual('testkey');
            expect(entry.Typ).toEqual('t1');
            expect(entry.Fields).toEqual(['f1', 'test 1', 'test 3', 'test 4'])
        })
        it('should give correct with duplicate', () => {
            //e.g. author and publisher and both are set => only use first
            const t: BibType = {
                Name: 't1',
                CitaviType: 'book',
                CitaviNecessaryFields: [],
                Fields: [
                    {
                        Field: 'f1',
                        CitaviAttributes: ['cf1'],
                    } as Field,
                    {
                        Field: 'f2',
                        CitaviAttributes: ['cf2', 'cf3'],
                    } as Field,
                ],
                CiteFields: [],
                Model: '',
                CiteModel: ''
            };
            const attributes: AttributeValue[] = [
                {
                    Attribute: 'cf1',
                    Value: 'test 1'
                },
                {
                    Attribute: 'cf2',
                    Value: 'test 2'
                },
                {
                    Attribute: 'cf3',
                    Value: 'test 3'
                }
            ];
            const entry = CreateEntry(t, attributes, 'testkey');
            expect(entry.Key).toEqual('testkey');
            expect(entry.Typ).toEqual('t1');
            expect(entry.Fields).toEqual(['test 1', 'test 2'])
        })
    })
})
