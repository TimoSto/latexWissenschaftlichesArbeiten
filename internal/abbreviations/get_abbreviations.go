package abbreviations

import (
	"strings"
)

func GetAbbreviations(project string, readFile func(string) ([]byte, error)) ([]Abbreviation, error) {

	var abbrs []Abbreviation

	file, err := readFile("./projects/" + project + "/abkuerzungen.csv")
	if err != nil {
		return abbrs, err
	}

	fileStr := string(file)

	lines := strings.Split(fileStr, "\n")

	lines = lines[1:]

	for _, l := range lines {
		parts := strings.Split(l, ";")
		if len(parts) >= 2 && len(parts[0]) > 0 && len(parts[1]) > 0 {
			abbrs = append(abbrs, Abbreviation{
				Abk: parts[0],
				Bed: parts[1],
			})
		}
	}

	return abbrs, nil
}
