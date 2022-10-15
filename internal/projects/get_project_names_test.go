package projects

import (
	"ThesorTeX/mock/mockFileSystem"
	"testing"
)

func TestReadDirWithTwo(t *testing.T) {
	res, err := GetProjectNames(mockFileSystem.ReadDir)

	if err != nil {
		t.Errorf("unexpected error %v", err)
	}

	if len(res) != 2 || res[0] != "project1" || res[1] != "project2" {
		t.Errorf("expected not %v", res)
	}
}
