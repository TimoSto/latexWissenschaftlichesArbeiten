package backups

import (
	"ThesorTeX/internal/pathbuilder"
	"fmt"
	"io/fs"
)

func ReadBackups(project string, readDir func(string) ([]fs.FileInfo, error)) []string {
	files, err := readDir(pathbuilder.GetPathFromExecRoot(fmt.Sprintf("/backups/%s", project)))
	if err != nil {
		return []string{}
	}

	var backups []string

	for _, f := range files {
		backups = append(backups, f.Name())
	}

	return backups
}
