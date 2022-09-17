package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	. "WA_LaTeX/internal/bib_types"
	"WA_LaTeX/pkg/logger"
)

func GetBibTypesHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	literatureTypes, err := ReadTypes(project)
	if err != nil {
		logger.LogError("Reading bibTypes for "+project, err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonObj, err := json.Marshal(literatureTypes)
	if err != nil {
		logger.LogError("Reading bibTypes for "+project, err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(jsonObj)
}
