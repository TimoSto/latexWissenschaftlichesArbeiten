package mockFileSystem

import (
	_ "embed"
	"fmt"
	"io/fs"
	"os"
	"strings"
	"time"
)

//go:embed abk_filled.csv
var abkFilled string

//go:embed abk_empty.csv
var abkEmpty string

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
	return fmt.Errorf("file not found")
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
