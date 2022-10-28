import {GetEntryKeyRules} from "@/inputRules/entryKeyRules";
import {BibEntry} from "@/api/bibEntries/Entry";

describe('entryKeyRules', () => {
    let rules: ((v: string) => boolean | string)[];
    beforeEach(() => {
        rules = GetEntryKeyRules(0, [{Key: 'test1'} as BibEntry, {Key: 'test3'} as BibEntry],  (v: string) => v);
    });

    it('should fail on empty input', () => {
        expect(rules[0]('')).toEqual('Common.MandatoryField')
    })
    it('should fail on existing name', () => {
        expect(rules[0]('test3')).toEqual('Projects.EntryEditor.Rules.KeyNotAvailable')
    })
    // it('should fail on space input', () => {
    //     expect(rules[0]('test 2')).toEqual('Projects.CategoryEditor.Rules.NoSpaces')
    // })
    it('should succeed on test1', () => {
        expect(rules[0]('test1')).toBe(true)
    })
    it('should succeed on test2', () => {
        expect(rules[0]('test2')).toBe(true)
    })
})