package handlers

import (
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type UploadEntriesData struct {
	Project  string
	Entries  []entries.BibEntry
	Override bool
}

func HandleUploadEntries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var data UploadEntriesData
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&data)
	if err != nil {
		logger.LogError("decoding obj with uploaded entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//TODO mit save_entry vereinheitlichen

	b_entries, err := entries.ReadBibEntries(data.Project, ioutil.ReadFile)
	if err != nil {
		logger.LogError("reading entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	for _, e := range data.Entries {
		b_entries = entries.AddEntry(e, e.Key, b_entries, data.Override)
	}

	err = entries.WriteEntries(data.Project, b_entries)
	if err != nil {
		logger.LogError("saving entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = entries.ConvertBibToCSV(data.Project, ioutil.ReadFile, ioutil.WriteFile)
	if err != nil {
		logger.LogError("converting entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
