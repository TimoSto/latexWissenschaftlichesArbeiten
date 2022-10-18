package projects

import (
	"ThesorTeX/internal/pathbuilder"
	"ThesorTeX/internal/templates"
	_ "embed"
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func CreateNewProject(name string) (bool, error) {
	projects, err := GetProjectNames(ioutil.ReadDir)
	if err != nil {
		return false, err
	}

	for _, p := range projects {
		if p == name {
			return true, nil
		}
	}

	err = os.MkdirAll(pathbuilder.GetProjectPath(name), os.ModePerm)
	if err != nil {
		return false, err
	}

	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "literatur.json"), []byte("[]"), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "literatur.csv"), []byte(templates.LiteraturCSVTemplate), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, name+".tex"), []byte(templates.TexTemplate), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "abkuerzungen.csv"), []byte("abk;bed;"), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "citedKeys.csv"), []byte("ckey;\n*;"), 0644)
	if err != nil {
		return false, err
	}
	//TODO: use from customStyles if exists
	var json = templates.LiteraturTypesTemplate
	var abk = templates.AbkSty
	var anhang = templates.AnhangSty
	var codes = templates.CodesSty
	var fusszeilen = templates.FusszeileSty
	var headerfooter = templates.HeaderFooterSty
	var toc = templates.TocSty
	var literatur = templates.LiteraturSty
	var ueberschriften = templates.UeberschriftenSty
	var html = templates.HtmlSty

	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "bibliography_types.json"), []byte(json), 0644)
	if err != nil {
		return false, err
	}

	err = os.Mkdir(pathbuilder.GetPathInProject(name, "styPackages"), 0755)
	if err != nil {
		return false, err
	}

	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/abk_verzeichnis.sty"), []byte(abk), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/anhang.sty"), []byte(anhang), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/codes.sty"), []byte(codes), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/fusszeilen.sty"), []byte(fusszeilen), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/header_footer.sty"), []byte(headerfooter), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/inhaltsverzeichnis.sty"), []byte(toc), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/literatur.sty"), []byte(literatur), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/ueberschriften.sty"), []byte(ueberschriften), 0644)
	if err != nil {
		return false, err
	}
	err = ioutil.WriteFile(pathbuilder.GetPathInProject(name, "styPackages/html.sty"), []byte(html), 0644)
	if err != nil {
		return false, err
	}

	//oldDir := "./styPackages"
	//newDir := fmt.Sprintf("./projects/%s/styPackages", name)

	//err = CopyDir(oldDir, newDir)

	return false, err
}

func useCustomStylesIfExist() {
	_, err := os.Stat("./customStyles")
	if err == nil {

	}
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
