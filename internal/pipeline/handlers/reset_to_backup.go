package handlers

import (
	"ThesorTeX/internal/backups"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"net/http"
)

type ResetData struct {
	Project string
	Backup  string
}

func HandleResetToBackup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		logger.LogError("Saving type", "wrong method")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var data ResetData
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&data)
	if err != nil {
		logger.LogError("decodig obj to reset", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if data.Project == "" || data.Backup == "" {
		logger.LogError("Resetting", "empty project or backup in data")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = backups.ResetProjectToBackup(data.Project, data.Backup)
	if err != nil {
		logger.LogError("Resetting project to backup", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
