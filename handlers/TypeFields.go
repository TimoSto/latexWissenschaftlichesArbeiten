package handlers

import (
	"WA_LaTeX/domain"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func HandleTypeFields(w http.ResponseWriter,r *http.Request) {
	lType := strings.Split(r.URL.Path, "typeFields/")[1]

	typeObj, err := domain.GetType(lType)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonStr, err := json.Marshal(typeObj)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(jsonStr)
}