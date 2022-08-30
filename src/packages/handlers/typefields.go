package handlers

//import (
//	"WA_LaTeX/src/packages/domain"
//	"WA_LaTeX/src/tools/logger"
//	"encoding/json"
//	"log"
//	"net/http"
//	"strings"
//)
//
//func HandleTypeFields(w http.ResponseWriter,r *http.Request) {
//	lType := strings.Split(r.URL.Path, "typeFields/")[1]
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
//	typeObj, err := domain.GetType(project, lType)
//	if err != nil {
//		logger.LogError("Reading type " + lType + "in project " + project, err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	jsonStr, err := json.Marshal(typeObj)
//	if err != nil {
//		logger.LogError("JSON-formatting typeObj", err.Error())
//		http.Error(w, err.Error(), http.StatusInternalServerError)
//		return
//	}
//
//	w.Write(jsonStr)
//}
