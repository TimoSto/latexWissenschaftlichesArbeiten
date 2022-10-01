package backups

import (
	"fmt"
	"io/ioutil"
	"os"
	"strings"

	cp "github.com/otiai10/copy"
)

func ResetToBackup(project string, backup string) error {
	files, err := ioutil.ReadDir("./backup/")
	if err != nil {
		return err
	}

	for _, f := range files {
		if strings.Index(f.Name(), backup) == 0 {
			err = os.RemoveAll("./projects/" + project + "/")
			if err != nil {
				return err
			}
			return cp.Copy("./backup/"+backup, "./projects/"+project)
		}
	}

	return fmt.Errorf("backup %s not found", backup)
}
