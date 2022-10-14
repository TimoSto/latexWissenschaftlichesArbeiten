package handlers

import (
	"ThesorTeX/internal/templates"
	"ThesorTeX/pkg/logger"
	"net/http"
)

func HandleCVTemplate(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write(templates.CVTemplate)
	if err != nil {
		logger.LogError("Writing template", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
	}
}
