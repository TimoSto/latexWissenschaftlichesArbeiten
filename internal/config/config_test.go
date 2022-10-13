package config

import (
	"fmt"
	"os"
	"testing"

	"gopkg.in/ini.v1"
)

func TestConfigReadWhenNoFilePresent(t *testing.T) {
	err := os.Remove("Config.ini")
	if err != nil {
		fmt.Println(err)
	}

	ReadConfig()

	cfg, err := ini.Load("Config.ini")
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}

	autoOpen, err := cfg.Section("").Key("autoOpenBrowser").Bool()
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
	if !autoOpen {
		t.Errorf("expected auto-open to be true, got %v", autoOpen)
	}

	if !ConfigObj.AutoOpenBrowser {
		t.Errorf("expected auto-open to be true, got %v", autoOpen)
	}
}
