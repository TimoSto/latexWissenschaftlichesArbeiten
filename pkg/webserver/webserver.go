package webserver

import (
	"net"
	"net/http"

	chain "github.com/justinas/alice"
)

// Chain which is identical for every resource
var commonHandlerChain = chain.New(
	addSecurityHeaders,
)

func addSecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")

		next.ServeHTTP(w, r)
	})
}

func Serve(l net.Listener, handler http.Handler) error {
	return http.Serve(l, handler)
}

// Handle first invokes the common handler chain and then corresponding resource
func Handle(resources []Resource) http.Handler {
	mux := http.NewServeMux()
	for _, r := range resources {
		mux.Handle(r.Pattern, r.Handler)
	}

	return commonHandlerChain.Then(mux)
}

type Resource struct {
	Pattern string
	Handler http.Handler
}
