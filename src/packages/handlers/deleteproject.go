package handlers

import (
	"WA_LaTeX/src/tools/logger"
	"fmt"
	cp "github.com/otiai10/copy"
	"log"
	"net/http"
	"os"
	"time"
)

func HandleDeleteProject(w http.ResponseWriter,r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	t := time.Now()
	err := cp.Copy(
		fmt.Sprintf("./projects/%s", project),
		fmt.Sprintf("./backup/%s-%s", project, t.Format("2006-01-02_15_04_05")))

	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	logger.LogInfo("Created Backup at " + fmt.Sprintf("./backup/%s-%s", project, t.Format("2006-01-02_15_04_05")))

	err = os.RemoveAll("./projects/"+project)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	logger.LogInfo(fmt.Sprintf("Successfully deleted project %s", project))
}