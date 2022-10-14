package handlers

import (
	"WA_LaTeX/internal/templates"
	"WA_LaTeX/pkg/logger"
	"net/http"
)

func HandleCVTemplate(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write(templates.CVTemplate)
	if err != nil {
		logger.LogError("Writing template", err.Error())
		w.WriteHeader(http.StatusInternalServerError)
	}
}
