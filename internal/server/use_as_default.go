package server

import (
	"log"
	"net/http"

	. "WA_LaTeX/internal/bib_types"
	"WA_LaTeX/pkg/logger"
)

func HandleDefaultSetter(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	err := UseBibsOfProjectAsDefault(project)

	if err != nil {
		logger.LogError("Changing default styles", err.Error())
		w.WriteHeader(400)
	}
}
