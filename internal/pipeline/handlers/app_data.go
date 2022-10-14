package handlers

import (
	"ThesorTeX/internal/projects"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"fmt"
	"net/http"
)

type AppData struct {
	Projects []string
}

func HandleGetAppData(w http.ResponseWriter, r *http.Request) {
	fmt.Println("appData")
	names, err := projects.GetProjectNames()
	if err != nil {
		logger.LogError("Reading project names", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	obj := AppData{
		Projects: names,
	}

	data, err := json.Marshal(obj)
	if err != nil {
		logger.LogError("Marshaling names", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Write(data)
}
