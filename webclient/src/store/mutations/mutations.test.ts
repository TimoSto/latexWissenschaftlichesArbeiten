import {AddProject} from "@/store/mutations/projectsViewMutations";
import {MyState} from "@/store/MyState";
import {RemoveType} from "@/store/mutations/categoryEditorMutations";

describe('AddProject', () => {
    it('test', () => {
        const state = {
            App: {
                ProjectNames: ['a', 'b', 'c', 'e', 'g']
            }
        }

        AddProject(state as MyState, 'd')

        expect(state.App.ProjectNames).toEqual(['a', 'b', 'c', 'd', 'e', 'g'])
    })
})

describe('Remove type', () => {
    it('test', () => {
        const state = {
            ProjectView: {
                CurrentProjectData: {
                    bibTypes: [
                        {Name: 't1'},
                        {Name: 't2'},
                        {Name: 't3'}
                    ]
                }
            }
        }

        RemoveType(state as MyState, 't2')

        expect(state.ProjectView.CurrentProjectData.bibTypes.map(t => t.Name)).toEqual(['t1', 't3'])
    })
})
