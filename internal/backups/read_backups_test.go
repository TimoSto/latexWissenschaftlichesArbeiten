package backups

import (
	"WA_LaTeX/mock/mockFileSystem"
	"testing"
)

func TestReadingBackupForProjectWithNoBackup(t *testing.T) {
	paths, err := ReadBackups("project_no_backup", mockFileSystem.ReadDir)
	if err != nil {
		t.Errorf("unecpected error %v", err)
	}
	if len(paths) > 0 {
		t.Errorf("expected none, got %v", paths)
	}
}

func TestReadingBackupForProjectWithBackup(t *testing.T) {
	paths, err := ReadBackups("project_with_backup", mockFileSystem.ReadDir)
	if err != nil {
		t.Errorf("unecpected error %v", err)
	}
	if len(paths) != 2 {
		t.Errorf("expected 2, got %v", paths)
	}
}
