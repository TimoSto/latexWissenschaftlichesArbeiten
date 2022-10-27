import separateEntries from "@/analyseFile/separateEntries";

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
})
