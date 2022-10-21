
const MutationTypes = {
    App: {
        SetCurrentView: 'App.SetCurrentView',
        SetProjectNames: 'App.SetProjectNames',
        SetConfig: 'App.SetConfig',
        RemoveProject: 'App.RemoveProject'
    },
    ProjectView: {
        SetCurrentProject: 'ProjectView.SetCurrentProject',
        AddProject: 'ProjectView.AddProject',
        SetCurrentProjectData: 'ProjectView.SetCurrentProjectData'
    }
}

export default MutationTypes