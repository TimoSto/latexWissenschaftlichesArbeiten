package abbreviations

import (
	"WA_LaTeX/mock/mockFileSystem"
	"testing"
)

func TestFilledAbbreviations(t *testing.T) {
	abbrs, _ := GetAbbreviations("project_with_abks", mockFileSystem.ReadFile)

	if len(abbrs) != 2 {
		t.Errorf("expected 2, got %v", len(abbrs))
	}
}
