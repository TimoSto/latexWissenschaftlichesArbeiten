package main

import (
	"flag"
	"os"
	"path/filepath"
	"text/template"

	"github.com/coreos/go-semver/semver"
)

var version = flag.String("version", "", "app version in semver format")

var fileinfo = `{
    "FixedFileInfo": {
        "FileVersion": {
            "Major": {{.Major}},
            "Minor": {{.Minor}},
            "Patch": {{.Patch}}
        },
        "ProductVersion": {
            "Major": {{.Major}},
            "Minor": {{.Minor}},
            "Patch": {{.Patch}}
        },
        "FileFlagsMask": "3f",
        "FileFlags ": "00",
        "FileOS": "040004",
        "FileType": "01",
        "FileSubType": "00"
    },
    "StringFileInfo": {
        "Comments": "",
        "CompanyName": "",
        "FileDescription": "WA_LaTeX",
        "FileVersion": "{{.Major}}.{{.Minor}}.{{.Patch}}",
        "InternalName": "",
        "LegalCopyright": "Timo Stovermann. All rights reserved.",
        "LegalTrademarks": "",
        "OriginalFilename": "WA_LaTeX.exe",
        "PrivateBuild": "",
        "ProductName": "WA_LaTeX",
        "ProductVersion": "{{.Major}}.{{.Minor}}.{{.Patch}}",
        "SpecialBuild": ""
    },
    "VarFileInfo": {
        "Translation": {
            "LangID": "0407",
            "CharsetID": "04B0"
        }
    },
    "IconPath": "",
    "ManifestPath": ""
}
`

func main() {
	flag.Parse()
	wd, err := os.Getwd()
	mustSucceed(err)
	var fileinfoPath = filepath.Join(wd, "versioninfo.json")

	version, err := semver.NewVersion(*version)
	mustSucceed(err)

	tpl, err := template.New("").Parse(fileinfo)
	mustSucceed(err)


	info := struct {
		Major int
		Minor int
		Patch int
	}{
		Major: int(version.Major),
		Minor: int(version.Minor),
		Patch: int(version.Patch),
	}

	f, err := os.OpenFile(fileinfoPath, os.O_CREATE|os.O_RDWR|os.O_TRUNC, 0666)
	mustSucceed(err)
	defer f.Close()

	err = tpl.Execute(f, info)
	mustSucceed(err)
}

func mustSucceed(err error) {
	if err != nil {
		panic(err)
	}
}
