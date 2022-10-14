package config

import (
	"os"
	"strconv"

	"gopkg.in/ini.v1"

	"ThesorTeX/pkg/logger"
)

type Config struct {
	AutoOpenBrowser bool
	Port            string
}

var ConfigObj = Config{
	AutoOpenBrowser: true,
	Port:            "8448",
}

func ReadConfig() {
	logger.LogInfo("Trying to read Config.ini...")
	cfg, err := ini.Load("Config.ini")
	if err == nil {
		logger.LogInfo("Config.ini found")
		autoOpenBrowser, err := cfg.Section("").Key("autoOpenBrowser").Bool()
		if err != nil {
			logger.LogError("Reading autoOpenBrowser from Config.ini", err.Error())
		} else {
			ConfigObj.AutoOpenBrowser = autoOpenBrowser
		}
	} else {
		err = WriteConfig()
		if err != nil {
			logger.LogError("Writing default Config.ini", err.Error())
		}
		logger.LogInfo("Using default-config")
	}
}

func WriteConfig() error {
	cfg, err := ini.Load("Config.ini")
	if err != nil {
		logger.LogInfo("No Config.ini found. Creating Config.ini...")
		_, err = os.Create("Config.ini")
		if err != nil {
			return err
		}
		cfg, err = ini.Load("Config.ini")
		if err != nil {
			return err
		}
	}

	cfg.Section("").Key("autoOpenBrowser").SetValue(strconv.FormatBool(ConfigObj.AutoOpenBrowser))
	return cfg.SaveTo("Config.ini")

}
