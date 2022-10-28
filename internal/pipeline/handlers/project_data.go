package handlers

import (
	"ThesorTeX/internal/backups"
	"ThesorTeX/internal/bibliography_types"
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type ProjectData struct {
	BibEntries  []entries.BibEntry
	BibTypes    []bibliography_types.BibliographyType
	BackupPaths []string
}

func HandleGetProjectData(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	projEntries, err := entries.ReadBibEntries(project, ioutil.ReadFile)
	if err != nil {
		logger.LogError("Reading entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	projEntries = entries.SortEntries(projEntries)

	bibTypes, err := bibliography_types.ReadTypes(project, ioutil.ReadFile)
	if err != nil {
		logger.LogError("Reading types", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	bibTypes = bibliography_types.SortBibliographyTypes(bibTypes)

	backupPaths := backups.ReadBackups(project, ioutil.ReadDir)

	data := ProjectData{
		BibEntries:  projEntries,
		BibTypes:    bibTypes,
		BackupPaths: backupPaths,
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		logger.LogError("Marshaling data", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	_, err = w.Write(jsonData)
	if err != nil {
		logger.LogError("Writing data", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
