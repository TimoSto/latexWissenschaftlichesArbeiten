package backups

import (
	"WA_LaTeX/internal/pathbuilder"
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	cp "github.com/otiai10/copy"
)

func ResetToBackup(project string, backup string) error {
	files, err := ioutil.ReadDir(pathbuilder.GetPathFromExecRoot("backup"))
	if err != nil {
		return err
	}

	for _, f := range files {
		if strings.Index(f.Name(), backup) == 0 {
			err = os.RemoveAll(pathbuilder.GetProjectPath(project))
			if err != nil {
				return err
			}
			return cp.Copy(pathbuilder.GetPathFromExecRoot("backup/"+backup), pathbuilder.GetProjectPath(project))
		}
	}

	return fmt.Errorf("backup %s not found", backup)
}
