package domain

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
)

func SaveTypesToLaTeX(types []LiteratureType) error{
	printBibCommands := "%Area to add new bibprints via gui\n" + GeneratePrintBibCommands(types) + "\n\t\t%end area"
	//fmt.Println(printBibCommands)
	ifsForBibCommands := "%Area to add new bibifs via gui\n" + GenerateIfsForBibCommands(types) + "\t\t%end area"

	citeCommands := "%Area to add citecommands via gui\n" + GenerateCiteCommands(types) + "%end area"
	ifsForCiteCommands := "%Area to add citeifs via gui\n" + GenerateIfsForCiteCommands(types) + "\t\t%end area"
	fmt.Println(ifsForCiteCommands)
	file, err := ioutil.ReadFile("./literatur.sty")
	if err != nil {
		fmt.Println(err)
		return err
	}
	m1 := regexp.MustCompile(`(?s)%Area to add new bibifs via gui(.*?)%end area`)
	newFile := m1.ReplaceAllString(string(file), ifsForBibCommands)
	m2 := regexp.MustCompile(`(?s)%Area to add new bibprints via gui(.*?)%end area`)
	newFile = m2.ReplaceAllString(newFile, printBibCommands)
	m3 := regexp.MustCompile(`(?s)%Area to add citecommands via gui(.*?)%end area`)
	newFile = m3.ReplaceAllString(newFile, citeCommands)
	m4 := regexp.MustCompile(`(?s)%Area to add citeifs via gui(.*?)%end area`)
	newFile = m4.ReplaceAllString(newFile, ifsForCiteCommands)

	return ioutil.WriteFile("./literatur.sty", []byte(newFile), 0644)
}

func GeneratePrintBibCommands(types []LiteratureType) string {
	commands := ""
	for _,lType := range types {
		command := `\newcommand{\print`+strings.ToLower(lType.Name)+"}[" + strconv.Itoa(len(lType.Fields)) + "]{\n" +
						"\t" + `\hangindent=\bibparindent` + "\n" +
						"\t" + `\parindent 0pt` + "\n" +
						"\t" + `\hangafter=1` + "\n\t"
		for i,field := range lType.Fields {
			command += field.Prefix
			switch field.Style {
			case "italic":
				command += `\textit{#` + strconv.Itoa(i+1) + `}`
				break
			default:
				command += `#` + strconv.Itoa(i+1)
			}
			command += field.Suffix
		}
		command += "\n\t\\\\\n\t" + `\vspace{-12pt}`+ "\n\n}\n"
		commands += command
	}

	return commands
}

func toChar(i int) string {
	return strings.ToLower(string('A' - 1 + i))
}

func GenerateIfsForBibCommands(types []LiteratureType) string{
	commands := ""

	for _,lType := range types {
		command := "\t\t{" + lType.Name + `}{\print` + strings.ToLower(lType.Name)
		for n,_ := range lType.Fields {
			command += `{\` + toChar(n+1) + `}`
		}
		command += `}%` + "\n"
		commands += command
	}
	return commands
}

func GenerateCiteCommands(types []LiteratureType) string {
	commands := ""

	for _,lType := range types {
		command := `\newcommand{\cite`+strings.ToLower(lType.Name)+"}[" + strconv.Itoa(len(lType.CiteFields)+1) + "]{\n\t"

		for i,field := range lType.CiteFields {
			command += field.Prefix
			switch field.Style {
			case "italic":
				command += `\textit{#` + strconv.Itoa(i+1) + `}`
				break
			default:
				command += `#` + strconv.Itoa(i+1)
			}
			command += field.Suffix
		}
		command += "#"+ strconv.Itoa(len(lType.CiteFields) + 1) +".\n}\n"
		commands += command
	}

	return commands
}

func GenerateIfsForCiteCommands(types []LiteratureType) string{
	commands := ""

	for _,lType := range types {
		command := "\t\t\t{" + lType.Name + `}{\footnote{#3\cite` + strings.ToLower(lType.Name)

		for _,field := range lType.CiteFields {
			fieldIndex := GetFieldIndex(lType.Fields, field.Field)
			command += `{\` + toChar(fieldIndex+1) + `}`
		}
		command += `{#2}}`
		command += `}%` + "\n"
		commands += command
	}
	return commands
}

func GetFieldIndex(bibFields []Field, field string) int{
	for i:=0 ; i < len(bibFields) ; i++ {
		if strings.Compare(bibFields[i].Field, field) == 0 {
			return i
		}
	}

	return -1
}