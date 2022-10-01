package handlers

import (
	"WA_LaTeX/internal/backups"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type BackupPathsResp struct {
	Paths []string
}

func GetBackupsHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	fmt.Println(project)

	paths, err := backups.ReadBackups(project)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(paths)

	data, err := json.Marshal(BackupPathsResp{Paths: paths})
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(data)
}
