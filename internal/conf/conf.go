package conf

import (
	_ "embed"
	"os"

	"gopkg.in/ini.v1"

	"WA_LaTeX/pkg/logger"
)

//go:embed VERSION
var Version string

var AutoOpenBrowser = false
var OverrideExistingEntries = true
var Protocol = "HTTP"

func ReadConfig() {
	cfg, err := ini.Load("Config.ini")
	if err == nil {
		AutoOpenBrowser, err = cfg.Section("").Key("autoOpenBrowser").Bool()
		OverrideExistingEntries, err = cfg.Section("").Key("overrideExistingEntries").Bool()
	} else {
		err = WriteConfig("false", "true")
		if err != nil {
			logger.LogError("Reading Config.ini", err.Error())
		}
	}
}

func WriteConfig(autoBrowserOpen string, override string) error {
	cfg, err := ini.Load("Config.ini")
	if err != nil {
		_, err = os.Create("Config.ini")
		if err != nil {
			return err
		}
		cfg, err = ini.Load("Config.ini")
		if err != nil {
			return err
		}
	}

	cfg.Section("").Key("autoOpenBrowser").SetValue(autoBrowserOpen)
	cfg.Section("").Key("overrideExistingEntries").SetValue(override)
	return cfg.SaveTo("Config.ini")

}
