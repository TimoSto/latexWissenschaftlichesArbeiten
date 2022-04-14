package handlers

import (
	"WA_LaTeX/src/packages/domain"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type StylesEditorDto struct {
	Styles []domain.StyleSetting
}

func HandleEditStyles(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	styles, err := domain.AnalyseStyles(project)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	file, err := GetHTMLFile("editStyles")
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl, err := template.New("editStyles").Parse(file)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := StylesEditorDto{
		Styles: styles,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		fmt.Println( err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}