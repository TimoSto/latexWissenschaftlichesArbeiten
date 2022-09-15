package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"syscall"

	"WA_LaTeX/pkg/logger"
)

type resObj struct {
	Success bool
	Log     string
}

func SaveAndCompile(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["project"]

	if !ok || len(keys[0]) < 1 {
		log.Println("Url Param 'key' is missing")
		http.Error(w, "Missing project parameter", http.StatusBadRequest)
		return
	}

	project := keys[0]

	fmt.Println(project)

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		logger.LogError("Reading Body", err.Error())
		http.Error(w, err.Error(), 400)
	}

	err = ioutil.WriteFile(fmt.Sprintf("./projects/%s/%s.tex", project, project), body, 0644)
	if err != nil {
		logger.LogError("Writing file", err.Error())
		http.Error(w, err.Error(), 500)
	}

	path, _ := os.Getwd()

	fmt.Println(path)

	cmd := exec.Command("CMD", "/C", path+`\compile.bat`, project)

	var outb, errb bytes.Buffer
	cmd.Stdout = &outb
	cmd.Stderr = &errb

	fmt.Println(cmd.String())

	err = cmd.Start()
	if err != nil {
		logger.LogError("sterting prog", err.Error())
		http.Error(w, err.Error(), 500)
	}

	success := true

	if err := cmd.Wait(); err != nil {
		if exiterr, ok := err.(*exec.ExitError); ok {
			// The program has exited with an exit code != 0

			// This works on both Unix and Windows. Although package
			// syscall is generally platform dependent, WaitStatus is
			// defined for both Unix and Windows and in both cases has
			// an ExitStatus() method with the same signature.
			if _, ok := exiterr.Sys().(syscall.WaitStatus); ok {
				success = false
			}
		} else {
			log.Fatalf("cmd.Wait: %v", err)
		}
	}

	fmt.Println(outb.String())

	obj := resObj{
		Success: success,
		Log:     outb.String(),
	}
	json, _ := json.Marshal(obj)
	w.Write(json)

	//fmt.Println("out:", outb.String(), "err:", errb.String())
}
