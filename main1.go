package main

import (
	// "fmt"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var db *gorm.DB
type Test struct {
	gorm.Model
	UserID uint
	Score  int
	Date   time.Time
}

type User struct {
	gorm.Model
	Name     string
	Username string `gorm:"uniqueIndex"`
	Password string
}

func main() {
	// Connect to MySQL database
	var err error
	db, err = gorm.Open(mysql.Open("root:Wyc@20041218@tcp(localhost:3306)/my_data?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic("failed to connect database")
	}

	// AutoMigrate will create the user table based on the User struct
	db.AutoMigrate(&User{})

	r := gin.Default()

	r.POST("/register", handleRegister)
	r.POST("/login", handleLogin)
 
	err = r.Run(":8080")
	if err != nil {
		panic("failed to start server")
	}
    r.POST("/submit-test", handleTestSubmission)
	r.GET("/user-info", handleUserInfo)

	err = r.Run(":8080")
	if err != nil {
		panic("failed to start server")
	}




}

func handleRegister(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Hash the password before storing it
	// You should use a proper password hashing library
	// For simplicity, we're not doing this here
	user.Password = "hash_password_here"

	// Create a new user in the database
	db.Create(&user)

	c.JSON(200, gin.H{"message": "User registered successfully"})
}

func handleLogin(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Find the user with the given username
	db.Where("username = ?", user.Username).First(&user)

	// Check if the password matches (you should use a proper authentication library)
	// For simplicity, we're not doing this here
	if user.Password == "hash_password_here" {
		c.JSON(200, gin.H{"message": "Login successful"})
	} else {
		c.JSON(401, gin.H{"error": "Invalid credentials"})
	}
}
func handleTestSubmission(c *gin.Context) {
	var answers struct {
		Answers []int `json:"answers"`
	}

	if err := c.ShouldBindJSON(&answers); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Calculate the test score (a simple sum of answers for demonstration purposes)
	score := 0
	for _, answer := range answers.Answers {
		score += answer
	}

	// Save the test record to the database
	userID, _ := c.Get("userID") // Assuming you have a middleware to extract userID from token
	test := Test{UserID: userID.(uint), Score: score, Date: time.Now()}
	db.Create(&test)

	c.JSON(200, gin.H{"score": score})
}

func handleUserInfo(c *gin.Context) {
	userID, _ := c.Get("userID") // Assuming you have a middleware to extract userID from token
	var user User
	var testHistory []Test

	// Fetch user information
	db.First(&user, userID.(uint))

	// Fetch test history for the user
	db.Where("user_id = ?", userID.(uint)).Find(&testHistory)

	c.JSON(200, gin.H{"userInfo": user, "testHistory": testHistory})
}
