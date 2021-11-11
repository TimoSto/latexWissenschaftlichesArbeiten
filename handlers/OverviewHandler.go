package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func HandleOverview(w http.ResponseWriter,r *http.Request) {
	tmpl, err := template.ParseFiles("./out/overview.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//types, err := domain.ReadTypes()
	//if err != nil {
	//	fmt.Println( err)
	//	http.Error(w, err.Error(), http.StatusInternalServerError)
	//	return
	//}

	err = tmpl.Execute(w, nil)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}