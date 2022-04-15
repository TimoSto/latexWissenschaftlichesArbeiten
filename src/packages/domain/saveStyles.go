package domain

import (
	"fmt"
	"io/ioutil"
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

	file, err := ioutil.ReadFile("./projects/" + project + "/"+project+".tex")
	if err != nil {
		return err
	}

	fileStr := string(file)

	for _,style := range currentStyles {
		for _,nstyle := range styles {
			if style.Package.Name == nstyle.Name {
				if style.Included != nstyle.Included {
					if nstyle.Included {
						option := style.Options
						if len(option) > 0 {
							option = "[" + option +"]"
						}

						noption := nstyle.ActiveOption
						if len(noption) > 0 {
							noption = "[" + noption +"]"
						}
						fileStr = strings.Replace(fileStr,
							fmt.Sprintf("%s\\usepackage%s{%s}", "%", option, style.Package.Name),
							fmt.Sprintf("\\usepackage%s{%s}", noption, style.Package.Name),
							-1)
					}
				}
			}
		}
	}

	fmt.Println(currentStyles[0], styles[0])

	fmt.Println(fileStr)


	return nil

	//file, err := ioutil.ReadFile("./projects/" + project + "/" + project + ".tex")
	//if err != nil {
	//	return err
	//}
	//fileStr := string(file)
	//
	//for _,style := range currentStyles {
	//	if !style.Included {
	//		regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(\\usepackage).*({styPackages/%s})$`, style.Package.Name))
	//		result := regex.FindAllString(fileStr, -1)
	//		fmt.Println(result)
	//		if len(result) > 0 && len(result[0]) > 0 {
	//			fileStr = strings.Replace(fileStr, result[0], "%" + result[0], 1)
	//		}
	//	} else {
	//		regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(%s\\usepackage).*({styPackages/%s})$`, "%", style.Package.Name))
	//		result := regex.FindAllString(fileStr, -1)
	//		fmt.Println(result)
	//		if len(result) > 0 && len(result[0]) > 0 {
	//			fileStr = strings.Replace(fileStr, result[0], result[0][1:], 1)
	//		}
	//	}
	//
	//
	//}
	//
	//return ioutil.WriteFile("./projects/" + project + "/" + project + ".tex", []byte(fileStr), 0644)
}