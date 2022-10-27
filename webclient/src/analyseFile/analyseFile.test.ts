import {extractEntryAttributes, extractKey, getTypeOfEntry, separateEntries} from "@/analyseFile/analyseFile";

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
})
