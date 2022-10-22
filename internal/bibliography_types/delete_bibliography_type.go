package bibliography_types

func DeleteBibliographyType(project string, btype string, readFile func(string) ([]byte, error)) error {
	types, err := ReadTypes(project, readFile)
	if err != nil {
		return err
	}

	for i, typ := range types {
		if typ.Name == btype {
			types = append(types[:i], types[i+1:]...)
			break
		}
	}

	return SaveBibliographyTypes(project, types)
}
