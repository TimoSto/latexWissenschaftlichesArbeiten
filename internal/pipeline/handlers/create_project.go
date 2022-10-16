package handlers

import (
	"ThesorTeX/internal/projects"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"net/http"
)

type CreateProjectObj struct {
	Name string
}

func HandleCreateProject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var obj CreateProjectObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&obj)
	if err != nil {
		logger.LogError("Reading post create project", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = projects.CreateNewProject(obj.Name)
	if err != nil {
		logger.LogError("Creating project", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
