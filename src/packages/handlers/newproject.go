package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"WA_LaTeX/src/tools/logger"
	"encoding/json"
	"fmt"
	"net/http"
)

type ProjectName struct {
	Name string
}

func HandleNewProject(w http.ResponseWriter, r *http.Request) {
	logger.LogInfo("Creating new project...")
	var NameObj ProjectName
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&NameObj)
	if err != nil {
		logger.LogError("Reading HTTP-POST-Body", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	alreadyExists, err := domain.CreateNewProject(NameObj.Name)
	if err != nil {
		logger.LogError("Creating new project "+NameObj.Name, err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if alreadyExists {
		logger.LogInfo(fmt.Sprintf("Project %s already exists", NameObj.Name))
		http.Error(w, "Project already exists", http.StatusBadRequest)
	} else {
		logger.LogInfo(fmt.Sprintf("Project %s successfully created", NameObj.Name))
	}
}