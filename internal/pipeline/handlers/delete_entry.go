package handlers

import (
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"log"
	"net/http"
)

func HandleDeleteEntry(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	entrykeys, ok := r.URL.Query()["entry"]

	if !ok || len(entrykeys[0]) < 1 {
		log.Println("Url Param 'entry' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	if r.Method != http.MethodDelete {
		logger.LogError("Handling request", "Only delete is permitted on route /deleteEntry")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := entries.DeleteBibliographyEntry(project, entrykeys[0])

	if err != nil {
		logger.LogError("Writing entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
	}

}
