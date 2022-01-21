package handlers

import (
	"WA_LaTeX/domain"
	"log"
	"net/http"
)

func HandleCiteCleanup(w http.ResponseWriter, r *http.Request) {

	project, ok := r.URL.Query()["project"]

	if !ok || len(project[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Url Param 'key' is missing", http.StatusBadRequest)
		return
	}

	err := domain.CiteCleanup(project[0])
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}
