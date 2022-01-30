package domain

import (
	"fmt"
	"regexp"
)

func CitaviToJSON(citaviFile string) BibEntry{
	m1 := regexp.MustCompile(`(@).*?({)`)
	bibType := m1.FindAllString(citaviFile, 1)
	bibType[0] = bibType[0][1:len(bibType[0])-1]
	m2 := regexp.MustCompile(`({.*?,)`)
	bibKey := m2.FindAllString(citaviFile, 1)
	bibKey[0] = bibKey[0][1:len(bibKey[0])-1]
	fmt.Println(bibType,bibKey)

	return BibEntry{}
}