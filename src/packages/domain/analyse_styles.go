package domain

import (
	"fmt"
	"io/ioutil"
	"regexp"
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
	file, err := ioutil.ReadFile("./projects/" + project + "/" + project + ".tex")
	if err != nil {
		fmt.Println(err)
		return []StyleSetting{}, err
	}
	for _,p := range relevantPackages {

		styleSetting := StyleSetting{
			Package: p,
		}

		regex := regexp.MustCompile(fmt.Sprintf(`(?m)^(\\usepackage).*({styPackages/%s})$`, p.Name))
		result := regex.FindAllString(string(file), -1)
		//TODO: Wenn mehr als 1 => fehler

		fmt.Println(result)
		if len(result) > 0 {
			styleSetting.Included = true

			optionsRegex := regexp.MustCompile("\\[(.*?)\\]")
			optionsResult := optionsRegex.FindString(result[0])

			if len(optionsResult) > 0 {
				styleSetting.Options = optionsResult[1:len(optionsResult) - 1]
			}
		}

		styleSettings = append(styleSettings, styleSetting)
	}

	return styleSettings, nil
}