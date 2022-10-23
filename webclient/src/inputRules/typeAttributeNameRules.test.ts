import {Field} from "@/api/bibTypes/BibType";
import {GetTypeAttributeNameRules} from "@/inputRules/typeAttributeNameRules";

describe('attribute-name-rules', () => {
    let rules: ((v: string) => boolean | string)[];
    beforeAll(() => {
        const fields = [
            {
                Field: 'test1'
            },
            {
                Field: 'test2'
            }
        ]
        rules = GetTypeAttributeNameRules(fields as Field[], (v: string) => v);
    })

    it('should fail on empty input', () => {
        expect(rules[0]('')).toEqual('Common.MandatoryField')
    })
})
