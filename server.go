package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	PORT := os.Getenv("PORT")
	http.HandleFunc("/a", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "Hey, Developers!")
	})
	err := http.ListenAndServe(PORT, nil)
	if err != nil {
		fmt.Println("Error", err)
	}
}
