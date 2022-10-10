package abbreviations

import "io/fs"

func WriteAbbreviations(abbrs []Abbreviation, project string, writeFile func(string, []byte, fs.FileMode) error) error {
	fileStr := "abk;bed;"

	for _, a := range abbrs {
		fileStr += "\n" + a.Abk + ";" + a.Bed + ";"
	}

	return writeFile("./projects/"+project+"/abkuerzungen.csv", []byte(fileStr), 06444)
}
