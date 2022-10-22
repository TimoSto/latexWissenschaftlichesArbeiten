
const ActionTypes = {
    App: {
        GetAppData: 'App.GetAppData',
        SaveConfig: 'App.SaveConfig'
    },
    Projects: {
        CreateProject: 'Projects.CreateProject',
        GetProjectData: 'Projects.GetProjectData',
        DeleteProject: 'Projects.DeleteProject',
        CategoryEditor: {
            DeleteCategory: 'Projects.CategoryEditor.DeleteCategory',
            SaveCategory: 'Projects.CategoryEditor.SaveCategory'
        }
    }
}

export default ActionTypes;
