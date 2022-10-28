package handlers

import (
	"ThesorTeX/internal/entries"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"fmt"
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

	fmt.Println(data.Entries)
}
