package server

//
//import (
//	"html/template"
//	"net/http"
//	"strings"
//
//	"WA_LaTeX/pkg/logger"
//)
//
//type ProjectHTMLDto struct {
//	ProjectName string
//	//LiteratureTypes domain.LiteratureTypes
//	//BibEntries []domain.BibEntry
//}
//
//func HandleGetProject(w http.ResponseWriter, r *http.Request) {
//
//	file, err := GetHTMLFile("project")
//	if err != nil {
//		logger.LogError("Reading project.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	tmpl, err := template.New("projectHTML").Parse(file)
//	if err != nil {
//		logger.LogError("Creating template project.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	name := strings.Split(r.URL.Path, "/projects/")[1]
//
//	//literatureTypes, err := domain.ReadTypes(name)
//	//if err != nil {
//	//	logger.LogError("Reading bibTypes for "+name, err.Error())
//	//	http.Error(w, err.Error(), http.StatusInternalServerError)
//	//	return
//	//}
//	//
//	//bib, err := domain.ReadBibEntries(name)
//	//if err != nil {
//	//	logger.LogError("Reading bibEntries for "+name, err.Error())
//	//	http.Error(w, err.Error(), http.StatusInternalServerError)
//	//	return
//	//}
//
//	data := ProjectHTMLDto{
//		ProjectName: name,
//		//LiteratureTypes: literatureTypes,
//		//BibEntries: bib,
//	}
//
//	err = tmpl.Execute(w, data)
//	if err != nil {
//		logger.LogError("Executing template projects.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//}
