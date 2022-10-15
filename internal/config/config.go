package config

import (
	"os"
	"strconv"

	"gopkg.in/ini.v1"

	"ThesorTeX/pkg/logger"
)

type Config struct {
	AutoOpenBrowser bool
	DarkMode        bool
	Port            string
}

var ConfigObj = Config{
	AutoOpenBrowser: true,
	DarkMode:        false,
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

		darkMode, err := cfg.Section("").Key("darkMode").Bool()
		if err != nil {
			logger.LogError("Reading darkMode from Config.ini", err.Error())
		} else {
			ConfigObj.DarkMode = darkMode
		}

		ConfigObj.Port = cfg.Section("").Key("port").String()
		if len(ConfigObj.Port) == 0 {
			ConfigObj.Port = "8448"
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
	cfg.Section("").Key("darkMode").SetValue(strconv.FormatBool(ConfigObj.DarkMode))
	cfg.Section("").Key("port").SetValue(ConfigObj.Port)
	return cfg.SaveTo("Config.ini")

}
