
const MutationTypes = {
    App: {
        SetCurrentView: 'App.SetCurrentView',
        SetProjectNames: 'App.SetProjectNames',
        SetConfig: 'App.SetConfig',
        RemoveProject: 'App.RemoveProject',
        SetSuccessMessage: 'App.SetSuccessMessage'
    },
    ProjectView: {
        SetCurrentProject: 'ProjectView.SetCurrentProject',
        AddProject: 'ProjectView.AddProject',
        SetCurrentProjectData: 'ProjectView.SetCurrentProjectData',
        EditorCloseNeeded: 'ProjectView.EditorCloseNeeded',
        SetEditorUpdateIndex: 'ProjectView.SetEditorUpdateIndex'
    },//TODO: Struktur von actions und mutations gleich halten
    CategoryEditor: {
        RemoveType: 'CategoryEditor.DeleteType',
        UpdateType: 'CategoryEditor.UpdateType'
    },
    EntryEditor: {
        RemoveEntry: 'EntryEditor.DeleteEntry',
        UpdateEntry: 'EntryEditor.UpdateEntry'
    },
}

export default MutationTypes