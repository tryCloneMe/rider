package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var Connection *sql.DB

func InitDB () {
	connection := fmt.Sprintf(
		"user=%s password=%s host=%s port=%d dbname=%s sslmode=disable",
		"postgres", "postgres", "localhost", 5432, "postgres",
	)

	var err error
	Connection, err =sql.Open("postgres", connection)
	if err != nil {
		fmt.Print(err)
	}
}