import GeneralizeTeXEscaping, {RemoveTrailingAndLeading} from "@/analyseFile/parseBibValues";

describe('parsing bibValues', () => {
    describe('removeTrailingAndLeading', () => {
        it('should work for leading', () => {
            expect(RemoveTrailingAndLeading('{hallo}', '{')).toEqual('hallo}')
        })
        it('should work for multiple leading', () => {
            expect(RemoveTrailingAndLeading('{{hallo}', '{')).toEqual('hallo}')
        })
        it('should work for newline', () => {
            expect(RemoveTrailingAndLeading('\\{hallo}', '\\')).toEqual('{hallo}')
        })
        it('should work for traling', () => {
            expect(RemoveTrailingAndLeading('{hallo}', '}')).toEqual('{hallo')
        })
    });
    describe('Generalize Tex-escaping', () => {
        it('should work 1', () => {
            expect(GeneralizeTeXEscaping('hallo')).toEqual('hallo')
        })
        it('should work 2', () => {
            expect(GeneralizeTeXEscaping('{hallo}')).toEqual('hallo')
        })
        it('should work combined', () => {
            expect(GeneralizeTeXEscaping('{\\"hallo"}')).toEqual('hallo')
        })
    })
})
