package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"encoding/json"
	"fmt"
	"net/http"
)

type ProjectName struct {
	Name string
}

func HandleNewProject(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Creating new project...")
	var NameObj ProjectName
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&NameObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	alreadyExists, err := domain.CreateNewProject(NameObj.Name)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if alreadyExists {
		fmt.Println(fmt.Sprintf("Project %s already exists", NameObj.Name))
		http.Error(w, "Project already exists", http.StatusBadRequest)
	} else {
		fmt.Println(fmt.Sprintf("Project %s successfully created", NameObj.Name))
	}
}