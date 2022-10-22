package handlers

import (
	"ThesorTeX/internal/bibliography_types"
	"ThesorTeX/pkg/logger"
	"io/ioutil"
	"log"
	"net/http"
)

func HandleDeleteType(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	typekeys, ok := r.URL.Query()["type"]

	if !ok || len(typekeys[0]) < 1 {
		log.Println("Url Param 'type' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	if r.Method != http.MethodDelete {
		logger.LogError("Handling request", "Only delete is permitted on route /deleteType")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := bibliography_types.DeleteBibliographyType(project, typekeys[0], ioutil.ReadFile)

	if err != nil {
		logger.LogError("Writing types", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
	}
}
