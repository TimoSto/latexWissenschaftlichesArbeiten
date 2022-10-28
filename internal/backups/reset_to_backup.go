package backups

import (
	"ThesorTeX/internal/pathbuilder"
	"fmt"
	"os"

	cp "github.com/otiai10/copy"
)

func ResetProjectToBackup(project string, backup string) error {
	path := pathbuilder.GetPathFromExecRoot(fmt.Sprintf("/backups/%s/%s", project, backup))
	info, err := os.Stat(path)
	if err != nil {
		return err
	}
	if !info.IsDir() {
		return fmt.Errorf("path is not a directory")
	}
	err = os.RemoveAll(pathbuilder.GetProjectPath(project))
	if err != nil {
		return err
	}
	return cp.Copy(path, pathbuilder.GetProjectPath(project))
}
