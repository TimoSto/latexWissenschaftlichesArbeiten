package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"log"
	"net/http"
)

func HandleDefaultSetter(w http.ResponseWriter,r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	err := domain.UseBibsOfProjectAsDefault(project)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(400)
	}
}