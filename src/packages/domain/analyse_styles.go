package domain

import (
	"io/ioutil"
	"strings"
)

type StyleSetting struct {
	Package Package
	Included bool
	Options string
}

type Package struct {
	Name string
	AvailableOptions []string
}

var relevantPackages = []Package{
	{
		Name: "ueberschriften",
		AvailableOptions: []string{"numeric", "latour"},
	},
	{
		Name: "inhaltsverzeichnis",
		AvailableOptions: []string{"numeric", "latour"},
	},
	{
		Name: "abk_verzeichnis",
		AvailableOptions: []string{},
	},
	{
		Name: "fusszeilen",
		AvailableOptions: []string{},
	},
	{
		Name: "literatur",
		AvailableOptions: []string{},
	},
	{
		Name: "header_footer",
		AvailableOptions: []string{},
	},
	{
		Name: "codes",
		AvailableOptions: []string{},
	},
	{
		Name: "anhang",
		AvailableOptions: []string{},
	},
}

func AnalyseStyles(project string) ([]StyleSetting, error){

	var styleSettings []StyleSetting

	//TODO: nach Projekt umbenamung => ?
	file, err := ioutil.ReadFile("./projects/" + project + "/"+project+".tex")
	if err != nil {
		return []StyleSetting{}, err
	}

	header := string(file)[:strings.Index(string(file), "\\begin{document}")]

	for _, line := range strings.Split(strings.TrimRight(header, "\n"), "\n") {
		if len(line) > 0 && line != "\n" && line != "\r" {//discard empty lines

			if strings.Index(line, "usepackage") > 0 {
				if strings.Index(line, "%") > 0 {//remove possible comment at end of string
					line = line[0:strings.Index(line, "%")]
				}

				pkg := StyleSetting{}

				if strings.Index(line, "%") == 0 {
					pkg.Included = false
				} else {
					pkg.Included = true
				}

				nameIndex0 := strings.Index(line, "{")
				nameIndex1 := strings.Index(line, "}")
				if nameIndex1 > 0 && nameIndex0 > 0 {
					pkg.Package.Name = line[nameIndex0+1:nameIndex1]
				}

				optionIndex0 := strings.Index(line, "[")
				optionIndex1 := strings.Index(line, "]")
				if optionIndex1 > 0 && optionIndex0 > 0 {
					pkg.Options = line[optionIndex0+1:optionIndex1]
				}

				styleSettings = append(styleSettings, pkg)
			}
		}
	}

	//for _,p := range relevantPackages {
	//
	//	styleSetting := StyleSetting{
	//		Package: p,
	//	}
	//
	//	//regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(\\usepackage).*({styPackages/%s})$`, p.Name))
	//	//result := regex.FindAllString(string(file), -1)
	//	////TODO: Wenn mehr als 1 => fehler
	//	//
	//	//if len(result) > 0 {
	//	//	styleSetting.Included = true
	//	//
	//	//	optionsRegex := regexp.MustCompile("\\[(.*?)\\]")
	//	//	optionsResult := optionsRegex.FindString(result[0])
	//	//
	//	//	if len(optionsResult) > 0 {
	//	//		styleSetting.Options = optionsResult[1:len(optionsResult) - 1]
	//	//	}
	//	//}
	//
	//	styleSettings = append(styleSettings, styleSetting)
	//}

	return styleSettings, nil
}