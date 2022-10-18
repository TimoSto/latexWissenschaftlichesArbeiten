package bibliography_types

import (
	"sort"
	"strings"
)

func SortBibliographyTypes(types []BibliographyType) []BibliographyType {
	sort.Slice(types, func(i, j int) bool {
		return strings.ToUpper(types[i].Name) < strings.ToUpper(types[j].Name)
	})

	return types
}
