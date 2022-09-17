package server

//import (
//	"WA_LaTeX/src/packages/domain"
//	"WA_LaTeX/pkg/logger"
//	"html/template"
//	"log"
//	"net/http"
//)
//
//type EditTypeHTMLDto struct {
//	Project string
//	Type domain.LiteratureType
//}
//
//func HandleEditType(w http.ResponseWriter,r *http.Request) {
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
//	data := EditTypeHTMLDto{
//		Project: project,
//	}
//
//	typekeys, ok := r.URL.Query()["type"]
//
//	if ok && len(typekeys[0]) > 0 {
//		//FILL FIELDS
//		typeToEdit, err := domain.GetType(project, typekeys[0])
//		if err != nil {
//			logger.LogError("Reading type-info for "+typekeys[0], err.Error())
//			http.Error(w, err.Error(), http.StatusInternalServerError)
//			return
//		}
//		data.Type = typeToEdit
//	}
//
//	file, err := GetHTMLFile("editType")
//	if err != nil {
//		logger.LogError("Reading editType.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	tmpl, err := template.New("editHTML").Parse(file)
//	if err != nil {
//		logger.LogError("Creating template for editEntry.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	err = tmpl.Execute(w, data)
//	if err != nil {
//		logger.LogError("Executing template for editEntry.html", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
// }
