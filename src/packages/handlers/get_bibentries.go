package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"WA_LaTeX/src/packages/domain"
)

func GetBibEntriesHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	entries, err := domain.ReadBibEntries(project)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	jsonObj, err := json.Marshal(entries)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), 500)
		return
	}

	w.Write(jsonObj)
}
