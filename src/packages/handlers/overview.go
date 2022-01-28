package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func HandleOverview(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./out/index.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}



	err = tmpl.Execute(w, nil)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}