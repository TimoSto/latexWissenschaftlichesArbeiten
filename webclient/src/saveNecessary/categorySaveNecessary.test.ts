import {MyState} from "@/store/MyState";
import {CategorySaveNecessary} from "@/saveNecessary/categorySaveNecessary";

describe('categorySaveNecessary', () => {
    let state: MyState;
    beforeAll(() => {
        state = {
            App: {
                CurrentView: 'projects',
                ProjectNames: [],
                Config: {
                    AutoOpenBrowser: false,
                    DarkMode: false,
                    Port: ''
                },
                Loaded: false
            },
            ProjectView: {
                CurrentProject: '',
                CurrentProjectData: {
                    backupPaths: [],
                    bibTypes: [
                        {
                            Name: 'test1',
                            CitaviType: 'aufsatz',
                            CitaviNecessaryFields: [],
                            Fields: [
                                {
                                    Field: 'test1',
                                    Style: 'normal',
                                    Prefix: '',
                                    Suffix: '',
                                    TexValue: false,
                                    CitaviAttributes: []
                                }
                            ],
                            CiteFields: [],
                            Model: '',
                            CiteModel: ''
                        }
                    ],
                    bibEntries: [],
                    abbreviations: []
                },
                EditorCloseNeeded: false,
                EditorIndexUpdate: -1
            }
        } as unknown as MyState
    })

    it('should not be necessary to save when all is equal', () => {
        expect(CategorySaveNecessary(state, 0, 'test1', 'aufsatz', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(false);
    })

    it('should not be necessary to save on new', () => {
        expect(CategorySaveNecessary(state, -1, 'test1', 'aufsatz', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(true);
    })

    it('should be necessary to save when name changed', () => {
        expect(CategorySaveNecessary(state, 0, 'test11', 'aufsatz', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(true);
    })

    it('should be necessary to save when category changed', () => {
        expect(CategorySaveNecessary(state, 0, 'test1', 'aufsatz1', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(true);
    })

    it('should be necessary to save when necessary fields changed', () => {
        expect(CategorySaveNecessary(state, 0, 'test11', 'aufsatz', ['doi'],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(true);
    })

    it('should be necessary to save when field changed', () => {
        expect(CategorySaveNecessary(state, 0, 'test11', 'aufsatz', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '-',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [])).toBe(true);
    })

    it('should be necessary to save when field added', () => {
        expect(CategorySaveNecessary(state, 0, 'test11', 'aufsatz', [],
            [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }], [{
                Field: 'test1',
                Style: 'normal',
                Prefix: '',
                Suffix: '',
                TexValue: false,
                CitaviAttributes: []
            }])).toBe(true);
    })

    it('should be necessary to save when field removed', () => {
        expect(CategorySaveNecessary(state, 0, 'test11', 'aufsatz', [],
            [], [])).toBe(true);
    })
})
