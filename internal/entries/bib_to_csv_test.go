package entries

import (
	"ThesorTeX/mock/mockFileSystem"
	"strings"
	"testing"
)

var csv_lines = []string{
	"key;type;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;",
	"test1;aufsatz;aaaatcv;ssdbbbbb;t;s;t;s;t;s;;;;;;;;;;;;;;;;;;;",
	"test2;aufsatz;2aaaatcv;2ssdbbbbb;2t;2s;2t;2s;2t;2s;;;;;;;;;;;;;;;;;;;",
	"empty;empty;a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;",
}

func TestBibToCSV_TwoEntries(t *testing.T) {
	err := ConvertBibToCSV("test2", mockFileSystem.ReadFile, mockFileSystem.WriteFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	file, err := mockFileSystem.ReadFile("projects/test2/literatur.csv")
	if err != nil {
		t.Errorf("%s", err)
	}
	lines := strings.Split(string(file), "\n")
	if len(lines) != 5 {
		t.Errorf("Expected 5 lines, got %v", len(lines))
	}
	if lines[0] != csv_lines[0] {
		t.Errorf("expected %s, got %s", csv_lines[0], lines[0])
	}
	if lines[1] != csv_lines[1] {
		t.Errorf("expected %s, got %s", csv_lines[1], lines[1])
	}
	if lines[2] != csv_lines[2] {
		t.Errorf("expected %s, got %s", csv_lines[2], lines[2])
	}
	if lines[3] != csv_lines[3] {
		t.Errorf("expected %s, got %s", csv_lines[3], lines[3])
	}
}

func TestBibToCSV_ZeroEntries(t *testing.T) {
	err := ConvertBibToCSV("test3", mockFileSystem.ReadFile, mockFileSystem.WriteFile)
	if err != nil {
		t.Errorf("%s", err)
	}
	file, err := mockFileSystem.ReadFile("project/test3/literatur.csv")
	if err != nil {
		t.Errorf("%s", err)
	}
	lines := strings.Split(string(file), "\n")
	if len(lines) != 3 {
		t.Errorf("Expected 3 lines, got %v", len(lines))
	}
	if lines[0] != csv_lines[0] {
		t.Errorf("expected %s, got %s", csv_lines[0], lines[0])
	}
	if lines[1] != csv_lines[3] {
		t.Errorf("expected %s, got %s", csv_lines[3], lines[1])
	}
}
