package projects

import (
	"ThesorTeX/internal/pathbuilder"
	"io/fs"
	"os"
)

func GetProjectNames(ReadDir func(dirname string) ([]fs.FileInfo, error)) ([]string, error) {
	projectsPath := pathbuilder.GetPathFromExecRoot("projects")
	dirContent, err := ReadDir(projectsPath)
	if err != nil {
		err = os.Mkdir(projectsPath, 0777)
		if err != nil {
			return nil, err
		}
		dirContent, err = ReadDir(projectsPath)
		if err != nil {
			return nil, err
		}
	}

	var projects []string

	for _, f := range dirContent {
		if f.IsDir() {
			projects = append(projects, f.Name())
		}
	}

	return projects, nil
}
