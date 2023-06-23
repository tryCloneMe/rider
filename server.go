package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	PORT := os.Getenv("PORT")

	http.Handle("/", http.FileServer(http.Dir("./static")))

	err := http.ListenAndServe(":80", nil)
	if err != nil {
		fmt.Println("Error", err)
	}
}
