package handlers

import (
	"ThesorTeX/internal/config"
	"ThesorTeX/pkg/logger"
	"encoding/json"
	"net/http"
)

func HandleSaveConfig(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	decoder := json.NewDecoder(r.Body)
	var conf config.Config
	err := decoder.Decode(&conf)
	if err != nil {
		logger.LogError("Decoding config save", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	config.ConfigObj = conf

	err = config.WriteConfig()
	if err != nil {
		logger.LogError("saving config", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
