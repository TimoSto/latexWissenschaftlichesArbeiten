package handlers

import (
	"WA_LaTeX/src/tools/logger"
	"fmt"
	cp "github.com/otiai10/copy"
	"net/http"
	"time"
)

func HandleBackup(w http.ResponseWriter, r *http.Request) {

	projectkeys, ok := r.URL.Query()["project"]

	if !ok || len(projectkeys[0]) <= 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	project := projectkeys[0]

	t := time.Now()
	err := cp.Copy(
		fmt.Sprintf("./projects/%s", project),
		fmt.Sprintf("./backup/%s-%s", project, t.Format("2006-01-02_15_04_05")))

	if err != nil {
		logger.LogError(fmt.Sprintf("Creating backup for %s", project), err.Error())
		w.WriteHeader(500)
		return
	}

	logger.LogInfo("Created Backup at " + fmt.Sprintf("./backup/%s-%s", project, t.Format("2006-01-02_15_04_05")))

}
