package domain

import (
	"fmt"
	"regexp"
	"strings"
)

func CitaviToJSON(citaviFile string) (BibEntry, error){
	m1 := regexp.MustCompile(`(@).*?({)`)
	bibType := m1.FindAllString(citaviFile, 1)
	bibType[0] = bibType[0][1:len(bibType[0])-1]
	m2 := regexp.MustCompile(`({.*?,)`)
	bibKey := m2.FindAllString(citaviFile, 1)
	bibKey[0] = bibKey[0][1:len(bibKey[0])-1]
	fmt.Println(bibType,bibKey)

	citaviFile = strings.ReplaceAll(citaviFile, `{\&}`, "{{\\&}}")
	citaviFile = strings.ReplaceAll(citaviFile, `{\_}`, "{{\\_}}")
	citaviFile = strings.ReplaceAll(citaviFile, `{\%}`, "{{\\%}}")

	bibEntry := BibEntry{
		Key: bibKey[0],
	}

	switch bibType[0] {
	case "article": bibEntry.Typ = "citaviAufsatzDoi"; break;

	default:
		return bibEntry, fmt.Errorf("NO_MATCHING_TYPE")
	}

	lines := strings.Split(citaviFile, "\n")

	lines = lines[3:]

	var fields = []string{"","","","","","","","","",""}

	for i,line := range lines {
		if len(line) > 2 {
			line = line[1:]
			parts := strings.Split(line, " = ")
			value := parts[1][1:len(parts[1]) - 2]
			if i < len(lines) - 2 {
				value = value[:len(value)-1]
			}

			index := getAttributeIndexInType(bibEntry.Typ, parts[0])
			if index >= 0 {
				fields[index] = value
			}
		}

	}

	bibEntry.Fields = fields

	return bibEntry, nil
}

func getAttributeIndexInType(bibType string, attr string) int{
	if bibType == "citaviAufsatzDoi" {
		switch attr {
		case "author": return 0
		case "title": return 1
		case "journal": return 2
		case "volume": return 3
		case "pages": return 4
		case "year": return 5
		case "doi": return 6
		}
	}

	return -1
}