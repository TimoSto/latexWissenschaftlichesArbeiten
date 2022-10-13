package handlers

import (
	"WA_LaTeX/internal/conf"
	"WA_LaTeX/pkg/logger"
	"encoding/json"
	"net/http"
)

func HandleConfig(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		data, err := json.Marshal(conf.Config{})
		if err != nil {
			logger.LogError("Marshaling config", err.Error())
		} else {
			w.Write(data)
		}
	}
}
