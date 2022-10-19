import {AddProject} from "@/store/mutations/projectsViewMutations";
import {MyState} from "@/store/MyState";

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
