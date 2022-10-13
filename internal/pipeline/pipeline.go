package pipeline

import (
	"WA_LaTeX/pkg/webserver"
	"WA_LaTeX/pkg/webserver/handlers"
	"net/http"
)

func CreateHandlerPipeline() []webserver.Resource {

	handler := []webserver.Resource{
		{Pattern: "/", Handler: http.HandlerFunc(handlers.HandleRoot)},
	}

	return handler
}
