import {GenerateModelFromFields} from "@/api/bibTypes/GenerateModelFromFields";
import {Field} from "@/api/bibTypes/BibType";

describe('SetModelFromFields', () => {
    it('with empty fields', () => {
        const fields: Field[] = []
        const model = GenerateModelFromFields(fields);
        expect(model).toEqual('')
    })
    it('with one field', () => {
        const fields: Field[] = [
            {
                Field: 'test1',
                Prefix: '',
                Suffix: '',
                Style: 'normal',
                TexValue: false,
                CitaviAttributes: []
            }
        ]
        const model = GenerateModelFromFields(fields);
        expect(model).toEqual('test1')
    })
    it('with one field with prefix, suffix and italic', () => {
        const fields: Field[] = [
            {
                Field: 'test1',
                Prefix: 'Mr. ',
                Suffix: '.',
                Style: 'italic',
                TexValue: false,
                CitaviAttributes: []
            }
        ]
        const model = GenerateModelFromFields(fields);
        expect(model).toEqual('Mr. <i>test1</i>.')
    })
    it('with three fields with prefix, suffix and italic', () => {
        const fields: Field[] = [
            {
                Field: 'test1',
                Prefix: '',
                Suffix: ' ',
                Style: 'normal',
                TexValue: false,
                CitaviAttributes: []
            },
            {
                Field: 'test2',
                Prefix: '(',
                Suffix: '), ',
                Style: 'italic',
                TexValue: false,
                CitaviAttributes: []
            },
            {
                Field: 'test3',
                Prefix: '',
                Suffix: '.',
                Style: 'normal',
                TexValue: false,
                CitaviAttributes: []
            }
        ]
        const model = GenerateModelFromFields(fields);
        expect(model).toEqual('test1 (<i>test2</i>), test3.')
    })
})