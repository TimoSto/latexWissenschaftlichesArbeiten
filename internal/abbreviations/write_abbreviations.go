package abbreviations

import "io/ioutil"

func WriteAbbreviations(abbrs []Abbreviation, project string) error {
	fileStr := "abk;bed;"

	for _, a := range abbrs {
		fileStr += "\n" + a.Abk + ";" + a.Bed + ";"
	}

	return ioutil.WriteFile("./projects/"+project+"/abkuerzungen.csv", []byte(fileStr), 06444)
}
