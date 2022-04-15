package handlers

import (
	"fmt"
	"net/http"
	cp "github.com/otiai10/copy"
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
		fmt.Println(err)
		w.WriteHeader(500)
	}

}
