package handlers

import (
	"ThesorTeX/internal/projects"
	"ThesorTeX/pkg/logger"
	"fmt"
	"log"
	"net/http"
)

func HandleDeleteProject(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	fmt.Println(keys)

	project := keys[0]

	err := projects.DeleteProject(project)
	if err != nil {
		logger.LogError("Deleting project", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
	}
}
