package handlers

import (
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type ProjectData struct {
	BibEntries []entries.BibEntry
}

func HandleGetProjectData(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'project' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	entries, err := entries.ReadBibEntries(project, ioutil.ReadFile)
	if err != nil {
		logger.LogError("Reading entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	data := ProjectData{
		BibEntries: entries,
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
