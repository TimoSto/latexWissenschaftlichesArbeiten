package domain

type StyleObj struct {
	Name string
	Included bool
	ActiveOption string
}

type PackageStyles struct {
	Project string
	Packages []StyleObj
}

func SaveStyles(project string, styles []StyleObj) error {

	currentStyles, err := AnalyseStyles(project)
	if err != nil {
		return err
	}

	for i,style := range currentStyles {
		for _,nstyle := range styles {
			if style.Package.Name == nstyle.Name {
				currentStyles[i].Included = nstyle.Included
				currentStyles[i].Options = nstyle.ActiveOption
			}
		}
	}
	
	return nil
}