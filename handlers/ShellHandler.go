package handlers

import (
	"fmt"
	"net/http"
)

func HandleShell(w http.ResponseWriter,r *http.Request) {
	fmt.Println("shell")
}