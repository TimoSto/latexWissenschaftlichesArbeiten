package projects

import (
	"ThesorTeX/internal/pathbuilder"
	"os"
)

func DeleteProject(project string) error {
	return os.RemoveAll(pathbuilder.GetProjectPath(project))
}
