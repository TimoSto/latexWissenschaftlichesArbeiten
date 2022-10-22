package handlers

import (
	"ThesorTeX/pkg/logger"
	"fmt"
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

	fmt.Println(project, typekeys[0])
}
