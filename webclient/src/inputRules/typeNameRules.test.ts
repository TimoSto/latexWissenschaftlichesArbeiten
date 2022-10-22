import GetTypeNameRules from "@/inputRules/typeNameRules";
import {BibType} from "@/api/bibTypes/BibType";

describe('typeNameRules', () => {
    let rules: ((v: string) => boolean | string)[];
    beforeEach(() => {
        rules = GetTypeNameRules([{Name: 'test1'} as BibType, {Name: 'test3'} as BibType], (v: string) => v);
    });

    it('should fail on empty input', () => {
        expect(rules[0]('')).toEqual('Common.MandatoryField')
    })
    it('should fail on existing name', () => {
        expect(rules[0]('test3')).toEqual('Projects.CategoryEditor.Rules.NameNotAvailable')
    })
    it('should fail on space input', () => {
        expect(rules[0]('test 2')).toEqual('Projects.CategoryEditor.Rules.NoSpaces')
    })
})