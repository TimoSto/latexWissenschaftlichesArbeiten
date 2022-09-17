package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	. "WA_LaTeX/internal/projects"
)

func GetProjectsHandler(w http.ResponseWriter, r *http.Request) {
	projects, err := GetProjects()
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonProjects, err := json.Marshal(projects)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	_, err = w.Write(jsonProjects)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
