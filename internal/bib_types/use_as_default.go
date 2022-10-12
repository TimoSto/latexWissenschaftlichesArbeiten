package bib_types

import (
	"WA_LaTeX/internal/pathbuilder"
	"io/ioutil"
	"os"

	cp "github.com/otiai10/copy"
)

func UseBibsOfProjectAsDefault(project string) error {
	os.Remove("customStyles")

	err := cp.Copy(pathbuilder.GetPathInProject(project, "styPackages"), pathbuilder.GetPathFromExecRoot("customStyles/styPackages"))
	if err != nil {
		return err
	}

	bytesRead, err := ioutil.ReadFile(pathbuilder.GetPathInProject(project, "literature_types.json"))
	if err != nil {
		return err
	}

	return ioutil.WriteFile(pathbuilder.GetPathFromExecRoot("customStyles/literature_types.json"), bytesRead, 0644)
}
