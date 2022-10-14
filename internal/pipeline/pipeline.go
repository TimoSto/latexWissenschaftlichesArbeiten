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
	}

	return handler
}
