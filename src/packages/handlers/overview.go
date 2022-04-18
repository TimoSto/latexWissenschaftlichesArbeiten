package handlers

import (
	"WA_LaTeX/src/packages/conf"
	"WA_LaTeX/src/packages/domain"
	"WA_LaTeX/src/tools/logger"
	"html/template"
	"net/http"
)

type OverviewHTMLDto struct {
	Projects []string
	Version  string
}

func HandleOverview(w http.ResponseWriter, r *http.Request) {

	file, err := GetHTMLFile("index")
	if err != nil {
		logger.LogError("Reading index.html", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl, err := template.New("indexHTML").Parse(file)
	if err != nil {
		logger.LogError("Creating template index.html", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	projects, err := domain.GetProjects()
	if err != nil {
		logger.LogError("Reading projects", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	data := OverviewHTMLDto{
		Projects: projects,
		Version: conf.Version,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		logger.LogError("Executing template index.html", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}