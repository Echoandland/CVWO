// main.go

package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type TestResult struct {
	UserID int `json:"user_id"`
	Score  int `json:"score"`
}

var db *sql.DB

func main() {
	
	var err error
	db, err = sql.Open("mysql", "root:Wyc@20041218@tcp(localhost:3306)/my_data")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MySQL database!")

	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3007"} // Replace with your frontend URL
	router.Use(cors.New(config))

	router.Use(cors.Default())
	router.POST("/register", registerHandler)
	router.POST("/login", loginHandler)
	router.POST("/submit-test", submitTestHandler)

	router.Run(":8080")
}

func registerHandler(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the username is already taken
	var existingUser User
	err := db.QueryRow("SELECT * FROM users WHERE username=?", user.Username).Scan(
		&existingUser.ID, &existingUser.Name, &existingUser.Username, &existingUser.Password,
	)

	if err != sql.ErrNoRows {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
		return
	}

	// Insert the new user into the database
	result, err := db.Exec("INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
		user.Name, user.Username, user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	userID, _ := result.LastInsertId()
	user.ID = int(userID)

	c.JSON(http.StatusOK, user)
}

func loginHandler(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the username and password match
	err := db.QueryRow("SELECT * FROM users WHERE username=? AND password=?",
		user.Username, user.Password).Scan(
		&user.ID, &user.Name, &user.Username, &user.Password,
	)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func submitTestHandler(c *gin.Context) {
	var testResult TestResult
	if err := c.BindJSON(&testResult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Insert the test result into the database
	_, err := db.Exec("INSERT INTO test_results (user_id, score) VALUES (?, ?)",
		testResult.UserID, testResult.Score)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Test submitted successfully"})
}

