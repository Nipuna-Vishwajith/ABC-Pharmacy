// main.go
package main

import (
	
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

var db *gorm.DB

type Drug struct {
	ID          uint       `gorm:"primary_key"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   *time.Time `sql:"index"`
	Name        string
	Description string
}

func main() {
	// Initialize the database
	initDB()

	// Set up routes with CORS middleware
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	router.GET("/drugs", getDrugs)
	router.POST("/drugs", addDrug)
	router.PUT("/drugs/:id", updateDrug)
	router.DELETE("/drugs/:id", deleteDrug)

	// Run the server
	router.Run(":8080")
}

// Initialize the database
func initDB() {
	var err error
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=youruser dbname=yourdb password=yourpassword sslmode=disable")
	if err != nil {
		panic("Failed to connect to database")
	}

	// Migrate the schema
	db.AutoMigrate(&Drug{})
}

// CRUD operations

// Get all drugs
func getDrugs(c *gin.Context) {
	var drugs []Drug
	db.Find(&drugs)
	c.JSON(200, drugs)
}

// Add a drug
func addDrug(c *gin.Context) {
	var drug Drug
	c.BindJSON(&drug)
	db.Create(&drug)
	c.JSON(200, drug)
}

// Update a drug
func updateDrug(c *gin.Context) {
	id := c.Params.ByName("id")
	var drug Drug
	if err := db.Where("id = ?", id).First(&drug).Error; err != nil {
	  c.AbortWithStatus(404)
	  return
	}
  
	// Bind the updated data from the request body
	if err := c.BindJSON(&drug); err != nil {
	  c.JSON(400, gin.H{"error": err.Error()})
	  return
	}
  
	// Save the updated drug to the database
	db.Save(&drug)
  
	c.JSON(200, drug)
  }

// Delete a drug
func deleteDrug(c *gin.Context) {
	id := c.Params.ByName("id")
	var drug Drug
	if err := db.Where("id = ?", id).First(&drug).Error; err != nil {
	  c.AbortWithStatus(404)
	  return
	}
  
	// Delete the drug from the database
	db.Delete(&drug)
  
	c.JSON(200, gin.H{"id": id, "message": "deleted"})
  }