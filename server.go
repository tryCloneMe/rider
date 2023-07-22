package main

import (
	db "app/postgres"
	"fmt"
	"net/http"
)

func getDrivers(w http.ResponseWriter, req *http.Request) {
	rows, err := db.Connection.Query("SELECT name FROM drivers")
	if err != nil {
		fmt.Println(err)
		return
	}

	data := ""
	for rows.Next() {
		var name string
		err = rows.Scan(&name)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(name)
		data += fmt.Sprintf("%s ", name)
	}
	err = rows.Err()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, data)
	rows.Close()
}

func main() {
	db.InitDB()
	defer db.Connection.Close()

	http.Handle("/", http.FileServer(http.Dir("./frontend/dist")))
	http.HandleFunc("/drivers", getDrivers)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error", err)
	}
}