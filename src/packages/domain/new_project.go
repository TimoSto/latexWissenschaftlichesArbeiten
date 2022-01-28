package domain

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func CreateNewProject(name string) (bool, error) {
	projects, err := GetProjects()
	if err != nil {
		return false, err
	}
	
	for _,p := range projects {
		if p == name {
			return true, nil
		}
	}

	err = os.Mkdir("./projects/"+name, 0755)
	if err != nil {
		return false, err
	}

	err = ioutil.WriteFile("./projects/"+name+"/literatur.json", []byte("[]"), 0644)
	if err != nil {
		return false, err
	}
	inputcsv, err := ioutil.ReadFile("literatur_template.csv")
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile("./projects/"+name+"/literatur.csv", inputcsv, 0644)
	if err != nil {
		return false, err
	}
	inputljson, err := ioutil.ReadFile("literature_types.json")
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile("./projects/"+name+"/literature_types.json", inputljson, 0644)
	if err != nil {
		return false, err
	}
	inputtex, err := ioutil.ReadFile("example.tex")
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile("./projects/"+name+"/"+name+".tex", inputtex, 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile("./projects/"+name+"/abkuerzungen.csv", []byte("abk;bed;"), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile("./projects/"+name+"/citedKeys.csv", []byte("ckey;\n*;"), 0644)
	if err != nil {
		return false, err
	}

	err = os.Mkdir("./projects/"+name+"/styPackages", 0755)
	if err != nil {
		return false, err
	}

	oldDir := "./styPackages"
	newDir := fmt.Sprintf("./projects/%s/styPackages", name)

	err = CopyDir(oldDir, newDir)

	return false, err
}

func CopyFile(source string, dest string) (err error) {
	sourcefile, err := os.Open(source)
	if err != nil {
		return err
	}

	defer sourcefile.Close()

	destfile, err := os.Create(dest)
	if err != nil {
		return err
	}

	defer destfile.Close()

	_, err = io.Copy(destfile, sourcefile)
	if err == nil {
		sourceinfo, err := os.Stat(source)
		if err != nil {
			err = os.Chmod(dest, sourceinfo.Mode())
		}

	}

	return
}

func CopyDir(source string, dest string) (err error) {

	// get properties of source dir
	sourceinfo, err := os.Stat(source)
	if err != nil {
		return err
	}

	// create dest dir

	err = os.MkdirAll(dest, sourceinfo.Mode())
	if err != nil {
		return err
	}

	directory, _ := os.Open(source)

	objects, err := directory.Readdir(-1)

	for _, obj := range objects {

		sourcefilepointer := source + "/" + obj.Name()

		destinationfilepointer := dest + "/" + obj.Name()


		if obj.IsDir() {
			// create sub-directories - recursively
			err = CopyDir(sourcefilepointer, destinationfilepointer)
			if err != nil {
				fmt.Println(err)
			}
		} else {
			// perform copy
			err = CopyFile(sourcefilepointer, destinationfilepointer)
			if err != nil {
				fmt.Println(err)
			}
		}

	}
	return
}