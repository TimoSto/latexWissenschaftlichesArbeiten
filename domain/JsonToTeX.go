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
	file, err := ioutil.ReadFile("./literatur.sty")
	if err != nil {
		fmt.Println(err)
		return err
	}
	m1 := regexp.MustCompile(`(?s)%Area to add new bibifs via gui(.*?)%end area`)
	newFile := m1.ReplaceAllString(string(file), ifsForBibCommands)
	m2 := regexp.MustCompile(`(?s)%Area to add new bibprints via gui(.*?)%end area`)
	newFile = m2.ReplaceAllString(newFile, printBibCommands)

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

func GenerateIfsForBibCommands(types []LiteratureType) string{
	commands := ""

	for _,lType := range types {
		command := "\t\t{" + lType.Name + `}{\print` + strings.ToLower(lType.Name)
		for _,field := range lType.Fields {
			command += `{\` + field.Field + `}`
		}
		command += `}%` + "\n"
		commands += command
	}
	return commands
}