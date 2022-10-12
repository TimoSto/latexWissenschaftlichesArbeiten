package backups

import (
	"WA_LaTeX/internal/pathbuilder"
	"io/fs"
	"strings"
)

func ReadBackups(project string, readDir func(string) ([]fs.FileInfo, error)) ([]string, error) {
	files, err := readDir(pathbuilder.GetPathFromExecRoot("backup"))
	if err != nil {
		return nil, err
	}

	var backups []string

	for _, f := range files {
		if strings.Index(f.Name(), project) == 0 {
			backups = append(backups, f.Name())
		}
	}

	return backups, nil
}
