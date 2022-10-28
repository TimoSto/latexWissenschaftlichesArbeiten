package handlers

import (
	"ThesorTeX/internal/pathbuilder"
	"ThesorTeX/pkg/logger"
	"fmt"
	"net/http"
	"time"

	cp "github.com/otiai10/copy"
)

func HandleCreateBackup(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	projectkeys, ok := r.URL.Query()["project"]

	if !ok || len(projectkeys[0]) <= 0 {
		logger.LogError("Creating backup", "project param missing")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	project := projectkeys[0]

	t := time.Now()

	backupPath := fmt.Sprintf("backups/%s/%s-%s", project, project, t.Format("2006-01-02_15_04_05"))

	err := cp.Copy(
		pathbuilder.GetProjectPath(project),
		pathbuilder.GetPathFromExecRoot(backupPath))

	if err != nil {
		logger.LogError(fmt.Sprintf("Creating backup for %s", project), err.Error())
		w.WriteHeader(500)
		return
	}

	msg := pathbuilder.GetPathFromExecRoot(backupPath)

	logger.LogInfo(msg)

	w.Write([]byte(msg))
}
