package server

import (
	"log"
	"net/http"

	. "WA_LaTeX/internal/bib_types"
	"WA_LaTeX/pkg/logger"
)

func HandleRefreshTypes(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	err := RefreshTypes(project)
	if err != nil {
		logger.LogError("Refreshing types for "+project, err.Error())
		http.Error(w, err.Error(), 500)
	}
}
