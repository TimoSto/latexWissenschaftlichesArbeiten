package server

//import (
//	"html/template"
//	"log"
//	"net/http"
//
//	"WA_LaTeX/src/packages/domain"
//	"WA_LaTeX/pkg/logger"
//)
//
//type BibHTMLDto struct {
//	LiteratureTypes domain.LiteratureTypes
//	BibEntries      []domain.BibEntry
//}
//
//func HandleLiteraturePage(w http.ResponseWriter, r *http.Request) {
//
//	file, err := GetHTMLFile("literature_page")
//	if err != nil {
//		logger.LogError("Reading literature_page.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	tmpl, err := template.New("bibHTML").Parse(file)
//	if err != nil {
//		logger.LogError("Creating template bib.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	keys, ok := r.URL.Query()["project"]
//
//	if !ok || len(keys[0]) < 1 {
//		log.Println("Url Param 'key' is missing")
//		http.Error(w, "Missing project parameter", http.StatusBadRequest)
//		return
//	}
//
//	project := keys[0]
//
//	literatureTypes, err := domain.ReadTypes(project)
//	if err != nil {
//		logger.LogError("Reading bibTypes for "+project, err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	bib, err := domain.ReadBibEntries(project)
//	if err != nil {
//		logger.LogError("Reading bibEntries for "+project, err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	data := BibHTMLDto{
//		LiteratureTypes: literatureTypes,
//		BibEntries:      bib,
//	}
//
//	err = tmpl.Execute(w, data)
//	if err != nil {
//		logger.LogError("Executing template bib.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//}
