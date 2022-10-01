package backups

import (
	"io/ioutil"
	"strings"
)

func ReadBackups(project string) ([]string, error) {
	files, err := ioutil.ReadDir("./backup/")
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
