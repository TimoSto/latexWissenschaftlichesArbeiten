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
	}

	return handler
}
