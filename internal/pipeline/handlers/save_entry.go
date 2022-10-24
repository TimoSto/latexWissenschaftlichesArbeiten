package handlers

import (
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type EntrySaveObj struct {
	Project    string
	InitialKey string
	Entry      entries.BibEntry
}

func HandleSaveEntry(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		logger.LogError("Saving entry", "wrong method")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var data EntrySaveObj
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&data)
	if err != nil {
		logger.LogError("decoding obj to save as entry", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	b_entries, err := entries.ReadBibEntries(data.Project, ioutil.ReadFile)
	if err != nil {
		logger.LogError("reading entries", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	b_entries = entries.AddEntry(data.Entry, data.InitialKey, b_entries)

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
