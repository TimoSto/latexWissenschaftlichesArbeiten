package pipeline

import (
	"ThesorTeX/internal/pipeline/handlers"
	"ThesorTeX/pkg/webserver"
	"net/http"
)

func CreateHandlerPipeline() []webserver.Resource {

	handler := []webserver.Resource{
		{Pattern: "/", Handler: http.HandlerFunc(handlers.HandleRoot)},
		{Pattern: "/projectTemplate", Handler: http.HandlerFunc(handlers.HandleProjectTemplate)},
		{Pattern: "/cvTemplate", Handler: http.HandlerFunc(handlers.HandleCVTemplate)},
		{Pattern: "/getAppData", Handler: http.HandlerFunc(handlers.HandleGetAppData)},
		{Pattern: "/saveConfig", Handler: http.HandlerFunc(handlers.HandleSaveConfig)},
		{Pattern: "/createProject", Handler: http.HandlerFunc(handlers.HandleCreateProject)},
		{Pattern: "/getProjectData", Handler: http.HandlerFunc(handlers.HandleGetProjectData)},
		{Pattern: "/deleteProject", Handler: http.HandlerFunc(handlers.HandleDeleteProject)},
		{Pattern: "/deleteType", Handler: http.HandlerFunc(handlers.HandleDeleteType)},
		{Pattern: "/saveType", Handler: http.HandlerFunc(handlers.HandleSaveType)},
		{Pattern: "/saveEntry", Handler: http.HandlerFunc(handlers.HandleSaveEntry)},
	}

	return handler
}
