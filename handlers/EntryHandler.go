package handlers

import (
	"WA_LaTeX/domain"
	"fmt"
	"html/template"
	"net/http"
	"strconv"
	"strings"
)

func HandleEntry(w http.ResponseWriter, r *http.Request) {
	reqType := strings.Split(r.URL.Path, "/entry/")[1]

	index,_ := strconv.ParseInt(reqType, 10, 64)

	bibEntries := domain.ReadBibEntries()


	tmpl, err := template.ParseFiles("./out/entry.html")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = tmpl.Execute(w, bibEntries[index])
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}