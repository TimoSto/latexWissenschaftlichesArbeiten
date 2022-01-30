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

	switch strings.ToLower(bibType[0]) {
	case "article":
		bibEntry.Typ = "citaviAufsatzDoi"
		break
	case "inbook":
		bibEntry.Typ = "citaviInbookDoi"
		break
	case "inproceedings":
		bibEntry.Typ = "citaviInProceedingsDoi"
		break
	default:
		return bibEntry, fmt.Errorf("NO_MATCHING_TYPE")
	}

	lines := strings.Split(citaviFile, "\n")

	//lines = lines[3:]

	var fields = []string{"","","","","","","","","",""}

	for _,line := range lines {
		if len(line) > 2 && string(line[0]) != "%" && string(line[0]) != "@" {
			//if string(line[len(line)-1]) == "}" && string(line[len(line)-2]) == "}" {
			//	line = line[:len(line)-1]
			//}
			//fmt.Println(string(line[len(line)-1]) + "f"+string(line[len(line)-2])+ "Line: "+line)
			for string(line[0]) == " " {
				line = line[1:]
			}
			parts := strings.Split(line, " = ")
			if len(parts) == 1 {
				parts = strings.Split(line, "=")
			}
			indexStart := strings.Index(parts[1], "{")
			indexEnd := strings.LastIndex(parts[1], "}")
			if indexStart != 0 {
				indexStart = strings.Index(parts[1], "\"")
				indexEnd = strings.LastIndex(parts[1], "\"")
			}
			fmt.Println(indexStart, indexEnd)
			value := parts[1][indexStart+1:indexEnd]
			if parts[0] == "title" {
				addKey := strings.Split(value, " ")[0]
				if len(addKey) > 5 {
					addKey = addKey[:5]
				}
				bibEntry.Key += "." + addKey
			} else if parts[0] == "author" {
				value = strings.ReplaceAll(value, " and ", "{{;}} ")
			} else if parts[0] == "doi" {
				value = strings.ReplaceAll(value, "_", "{{\\_}}")
			}

			index := getAttributeIndexInType(bibEntry.Typ, parts[0])
			fmt.Println(index)
			if index >= 0 {
				fields[index] = value
			}
		}

	}

	bibEntry.Fields = fields

	return bibEntry, nil
}

func getAttributeIndexInType(bibType string, attr string) int{
	fmt.Println(bibType, attr)
	if bibType == "citaviAufsatzDoi" {
		switch attr {
		case "author":
			return 0
		case "title":
			return 1
		case "journal":
			return 2
		case "volume":
			return 3
		case "pages":
			return 4
		case "year":
			return 5
		case "doi":
			return 6
		}
	} else if bibType == "citaviInbookDoi" {
		switch attr {
		case "author":
			return 0
		case "year":
			return 1
		case "title":
			return 2
		case "bookTitle":
			return 3
		case "publisher":
			return 4
		case "address":
			return 5
		case "doi":
			return 6
		}
	} else if bibType == "citaviInProceedingsDoi" {
		switch attr {
		case "author":
			return 0
		case "year":
			return 1
		case "title":
			return 2
		case "booktitle":
			return 3
		case "pages":
			return 4
		case "doi":
			return 5
		}
	}

	return -1
}