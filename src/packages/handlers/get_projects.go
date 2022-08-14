package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"WA_LaTeX/src/packages/domain"
)

func GetProjectsHandler(w http.ResponseWriter, r *http.Request) {
	projects, err := domain.GetProjects()
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
