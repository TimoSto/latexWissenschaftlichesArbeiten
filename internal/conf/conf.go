package conf

import (
	_ "embed"
	"os"

	"gopkg.in/ini.v1"

	"WA_LaTeX/pkg/logger"
)

//go:embed VERSION
var Version string

type Config struct {
	AutoOpenBrowser         bool
	OverrideExistingEntries bool
}

var ConfigObj = Config{
	AutoOpenBrowser:         false,
	OverrideExistingEntries: true,
}

var Protocol = "HTTP"

func ReadConfig() {
	cfg, err := ini.Load("Config.ini")
	if err == nil {
		autoOpenBrowser, _ := cfg.Section("").Key("autoOpenBrowser").Bool()
		ConfigObj.AutoOpenBrowser = autoOpenBrowser
		overrideExistingEntries, err := cfg.Section("").Key("overrideExistingEntries").Bool()
		if err == nil {
			ConfigObj.OverrideExistingEntries = overrideExistingEntries
		}
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
