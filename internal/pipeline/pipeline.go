package pipeline

import (
	"WA_LaTeX/internal/pipeline/handlers"
	"WA_LaTeX/pkg/webserver"
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
