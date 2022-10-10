package mockFileSystem

import (
	_ "embed"
	"io/fs"
	"os"
	"strings"
	"time"
)

//go:embed abks/abk_filled.csv
var abkFilled string

//go:embed abks/abk_empty.csv
var abkEmpty string

//go:embed literatures/test1.json
var test1_bib string

//go:embed literatures/test2.json
var test2_bib string

//go:embed literatures/test3.json
var test3_bib string

var test2_csv string

var test3_csv string

//go:embed tex_files/test1.tex
var test1_tex string

//go:embed tex_files/test2.tex
var test2_tex string

func ReadFile(name string) ([]byte, error) {
	name = strings.TrimLeft(name, "./")
	parts := strings.Split(name, "/")
	if parts[2] == "abkuerzungen.csv" {
		if parts[1] == "project_with_abks" {
			return []byte(abkFilled), nil
		}
		if parts[1] == "project_without_abks" {
			return []byte(abkEmpty), nil
		}
	}
	if parts[2] == "literatur.json" {
		if parts[1] == "test1" {
			return []byte(test1_bib), nil
		}
		if parts[1] == "test2" {
			return []byte(test2_bib), nil
		}
		if parts[1] == "test3" {
			return []byte(test3_bib), nil
		}
	}
	if parts[2] == "literatur.csv" {
		if parts[1] == "test2" {
			return []byte(test2_csv), nil
		}
		if parts[1] == "test3" {
			return []byte(test3_csv), nil
		}
	}
	if parts[2] == "test1.tex" {
		return []byte(test1_tex), nil
	}
	if parts[2] == "test2.tex" {
		return []byte(test2_tex), nil
	}

	return nil, nil
}

func WriteFile(path string, data []byte, fm fs.FileMode) error {
	path = strings.TrimLeft(path, "./")
	parts := strings.Split(path, "/")
	if parts[2] == "abkuerzungen.csv" {
		if parts[1] == "project_with_abks" {
			abkFilled = string(data)
			return nil
		}
		if parts[1] == "project_without_abks" {
			abkEmpty = string(data)
			return nil
		}
	}
	if parts[2] == "literatur.csv" {
		if parts[1] == "test2" {
			test2_csv = string(data)
			return nil
		}
		if parts[1] == "test3" {
			test3_csv = string(data)
			return nil
		}
	}
	if parts[2] == "literatur.json" {
		if parts[1] == "test1" {
			test1_bib = string(data)
			return nil
		}
		if parts[1] == "test2" {
			test2_bib = string(data)
			return nil
		}
		if parts[1] == "test3" {
			test3_bib = string(data)
			return nil
		}
	}
	return nil
}

type MockFileInfo struct {
	FileName    string
	IsDirectory bool
}

func (mfi MockFileInfo) Name() string       { return mfi.FileName }
func (mfi MockFileInfo) Size() int64        { return int64(8) }
func (mfi MockFileInfo) Mode() os.FileMode  { return os.ModePerm }
func (mfi MockFileInfo) ModTime() time.Time { return time.Now() }
func (mfi MockFileInfo) IsDir() bool        { return mfi.IsDirectory }
func (mfi MockFileInfo) Sys() interface{}   { return nil }

func ReadDir(path string) ([]fs.FileInfo, error) {
	if path == "./backup/" {
		return []fs.FileInfo{
			MockFileInfo{
				FileName:    "project_with_backup_1_1_1",
				IsDirectory: true,
			},
			MockFileInfo{
				FileName:    "project_with_backup_1_2_1",
				IsDirectory: true,
			},
		}, nil
	}
	return nil, nil
}
