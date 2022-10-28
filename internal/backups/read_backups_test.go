package backups

import (
	"ThesorTeX/mock/mockFileSystem"
	"testing"
)

func TestReadingBackupForProjectWithNoBackup(t *testing.T) {
	paths := ReadBackups("project_no_backup", mockFileSystem.ReadDir)

	if len(paths) > 0 {
		t.Errorf("expected none, got %v", paths)
	}
}

func TestReadingBackupForProjectWithBackup(t *testing.T) {
	paths := ReadBackups("project_with_backup", mockFileSystem.ReadDir)

	if len(paths) != 2 {
		t.Errorf("expected 2, got %v", paths)
	}
}
