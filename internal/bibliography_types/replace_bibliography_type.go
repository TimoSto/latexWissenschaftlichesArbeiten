package bibliography_types

func ReplaceBibliographyType(project string, initialName string, btype BibliographyType, readFile func(string) ([]byte, error)) error {
	types, err := ReadTypes(project, readFile)
	if err != nil {
		return err
	}

	found := false

	for i, t := range types {
		if (t.Name == btype.Name || t.Name == initialName) && !found {
			types[i] = btype
			found = true
			break
		}
	}

	if !found {
		types = append(types, btype)
	}

	return SaveBibliographyTypes(project, types)
	//TODO: namensüberlappung im frontend abtesten
}
