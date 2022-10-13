package logger

import (
	"fmt"
	"log"
	"os"
)

var ErrorFileLogger *log.Logger

func Init() {
	file, err := os.OpenFile("errorLogs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	ErrorFileLogger = log.New(file, "ERROR: ", log.Ldate|log.Ltime)
	LogInfo("Errormessages will be logged into ./errorLogs.txt")
}

func LogInfo(msg string) {
	log.Println(msg)
}

func LogError(action string, msg string) {
	errMsg := fmt.Sprintf("ERROR executing %s: %s", action, msg)
	log.Println(errMsg)
	ErrorFileLogger.Println(errMsg)
}
