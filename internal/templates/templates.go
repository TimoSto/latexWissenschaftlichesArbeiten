package templates

import _ "embed"

//go:embed projectTemplate.zip
var ProjectTemplate []byte

//go:embed cvTemplate.zip
var CVTemplate []byte

//go:embed project/example.tex
var TexTemplate string

//go:embed project/styPackages/abk_verzeichnis.sty
var AbkSty string

//go:embed project/styPackages/anhang.sty
var AnhangSty string

//go:embed project/styPackages/codes.sty
var CodesSty string

//go:embed project/styPackages/fusszeilen.sty
var FusszeileSty string

//go:embed project/styPackages/header_footer.sty
var HeaderFooterSty string

//go:embed project/styPackages/inhaltsverzeichnis.sty
var TocSty string

//go:embed project/styPackages/literatur.sty
var LiteraturSty string

//go:embed project/styPackages/ueberschriften.sty
var UeberschriftenSty string

//go:embed project/literatur_template.csv
var LiteraturCSVTemplate string

//go:embed project/literature_types.json
var LiteraturTypesTemplate string

//go:embed project/styPackages/html.sty
var HtmlSty string
