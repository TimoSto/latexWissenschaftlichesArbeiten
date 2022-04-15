package domain

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

type StyleObj struct {
	Name string
	Included bool
	ActiveOption string
}

type PackageStyles struct {
	Project string
	Packages []StyleObj
}

func SaveStyles(project string, styles []StyleObj) error {

	currentStyles, err := AnalyseStyles(project)
	if err != nil {
		return err
	}

	for i,style := range currentStyles {
		for _,nstyle := range styles {
			if style.Package.Name == nstyle.Name {
				currentStyles[i].Included = nstyle.Included
				currentStyles[i].Options = nstyle.ActiveOption
			}
		}
	}

	file, err := ioutil.ReadFile("./projects/" + project + "/" + project + ".tex")
	if err != nil {
		return err
	}
	fileStr := string(file)

	for _,style := range currentStyles {
		if !style.Included {
			regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(\\usepackage).*({styPackages/%s})$`, style.Package.Name))
			result := regex.FindAllString(fileStr, -1)
			fmt.Println(result)
			if len(result) > 0 && len(result[0]) > 0 {
				fileStr = strings.Replace(fileStr, result[0], "%" + result[0], 1)
			}
		} else {
			regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(%s\\usepackage).*({styPackages/%s})$`, "%", style.Package.Name))
			result := regex.FindAllString(fileStr, -1)
			fmt.Println(result)
			if len(result) > 0 && len(result[0]) > 0 {
				fileStr = strings.Replace(fileStr, result[0], result[0][1:], 1)
			}
		}


	}

	return ioutil.WriteFile("./projects/" + project + "/" + project + ".tex", []byte(fileStr), 0644)
}