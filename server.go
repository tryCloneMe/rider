package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./frontend/dist")))

	err := http.ListenAndServe(":80", nil)
	if err != nil {
		fmt.Println("Error", err)
	}
}
