package cv

import _ "embed"

//go:embed template/curriculumVitae.pdf
var cvPDF string

//go:embed template/curriculumVitae.tex
var cvTex string

func GetTemplate(contentType string) string {
	if contentType == "pdf" {
		return cvPDF
	}
	return cvTex
}
