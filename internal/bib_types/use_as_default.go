package bib_types

import (
	"io/ioutil"
	"os"

	cp "github.com/otiai10/copy"
)

func UseBibsOfProjectAsDefault(project string) error {
	os.Remove("customStyles")

	err := cp.Copy("./projects/"+project+"/styPackages", "./customStyles/styPackages")
	if err != nil {
		return err
	}

	bytesRead, err := ioutil.ReadFile("./projects/" + project + "/literature_types.json")
	if err != nil {
		return err
	}

	return ioutil.WriteFile("./customStyles/literature_types.json", bytesRead, 0644)
}
