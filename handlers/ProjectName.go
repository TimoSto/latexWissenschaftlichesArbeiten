package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

type ProjectName struct {
	Name string
	InitialName string
}

func HandleProjectName(w http.ResponseWriter, r *http.Request) {
	var saveObj ProjectName
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&saveObj)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), 500)
	}

	if len(saveObj.InitialName) > 0 {
		err = os.Rename("./projects/"+saveObj.InitialName, "./projects/" + saveObj.Name)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
	} else {
		err := os.Mkdir("./projects/"+saveObj.Name, 0755)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}

		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/literatur.json", []byte("[]"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		inputcsv, err := ioutil.ReadFile("literatur_template.csv")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/literatur.csv", inputcsv, 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		inputtex, err := ioutil.ReadFile("example.tex")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/"+saveObj.Name+".tex", inputtex, 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/abkuerzungen.csv", []byte("abk;bed;"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/citedKeys.csv", []byte("ckey;\n*;"), 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}

		inputbat, err := ioutil.ReadFile("compile.bat")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
		inputbat = []byte(strings.Replace(string(inputbat), "MY_PROJECT_NAME", saveObj.Name, 1))
		err = ioutil.WriteFile("./projects/"+saveObj.Name+"/compile.bat", inputbat, 0644)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}

		err = os.Mkdir("./projects/"+saveObj.Name+"/styPackages", 0755)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}

		oldDir := "./styPackages"
		newDir := fmt.Sprintf("./projects/%s/styPackages", saveObj.Name)

		err = CopyDir(oldDir, newDir)

		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), 500)
		}
	}

	//TODO: rename files?
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