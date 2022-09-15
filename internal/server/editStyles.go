package server

//import (
//	"WA_LaTeX/src/packages/domain"
//	"WA_LaTeX/pkg/logger"
//	"html/template"
//	"log"
//	"net/http"
//)
//
//type StylesEditorDto struct {
//	Styles []domain.StyleSetting
//}
//
//func HandleEditStyles(w http.ResponseWriter, r *http.Request) {
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
//	styles, err := domain.AnalyseStyles(project)
//	if err != nil {
//		logger.LogError("Analysing tex-styles for project "+ project, err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	file, err := GetHTMLFile("editStyles")
//	if err != nil {
//		logger.LogError("Reading editStyles.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	tmpl, err := template.New("editStyles").Parse(file)
//	if err != nil {
//		logger.LogError("Creating template from editStyles.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	data := StylesEditorDto{
//		Styles: styles,
//	}
//
//	err = tmpl.Execute(w, data)
//	if err != nil {
//		logger.LogError("Executing template editStyles.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//}
