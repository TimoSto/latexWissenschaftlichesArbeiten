import {Field} from "@/api/bibType/BibType";
import GeneratePreviewsForBibEntry from "@/api/bibEntry/GeneratePreviewsForBibEntry";

describe('GeneratePreview', ()=> {
    it('should give cite with S.x', ()=> {
        const f: Field[] = [
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
        ];
        const fc: Field[] = [
            {
                Field: 't3',
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
                Suffix: '), ',
                TexValue: false,
                CitaviAttributes: []
            },
        ];
        const previews = GeneratePreviewsForBibEntry(f, fc, ['Tomson, Tom', '2001', 'Tomson'])

        expect(previews[0]).toEqual('Tomson, Tom, (<i>2001</i>).')
        expect(previews[1]).toEqual('Tomson, (<i>2001</i>), S. x')
    })

    it('should give cite without S. x', ()=> {
        const f: Field[] = [
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
        ];
        const fc: Field[] = [
            {
                Field: 't3',
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
                Suffix: ')',
                TexValue: false,
                CitaviAttributes: []
            },
        ];
        const previews = GeneratePreviewsForBibEntry(f, fc, ['Tomson, Tom', '2001', 'Tomson'])

        expect(previews[0]).toEqual('Tomson, Tom, (<i>2001</i>).')
        expect(previews[1]).toEqual('Tomson, (<i>2001</i>)')
    })
})