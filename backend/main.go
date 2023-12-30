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

type Item struct {
	ID           uint       `gorm:"primary_key"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    *time.Time `sql:"index"`
	Name         string
	UnitPrice    float64
	UnitQuantity int
	ItemCategory string
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

	// Routes for Drugs
	router.GET("/drugs", getDrugs)
	router.POST("/drugs", addDrug)
	router.PUT("/drugs/:id", updateDrug)
	router.DELETE("/drugs/:id", deleteDrug)

	// Routes for Items
	router.GET("/items", getItems)
	router.POST("/items", addItem)
	router.PUT("/items/:id", updateItem)
	router.DELETE("/items/:id", deleteItem)

	

	// Run the server
	router.Run(":8080")
}

// Initialize the database
func initDB() {
	var err error
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=ABC_Pharmacy password=156e26377# sslmode=disable")
	if err != nil {
		panic("Failed to connect to database")
	}

	// Migrate the schema
	db.AutoMigrate(&Drug{}, &Item{})
}

// CRUD operations for Drugs

func getDrugs(c *gin.Context) {
	var drugs []Drug
	db.Find(&drugs)
	c.JSON(200, drugs)
}

func addDrug(c *gin.Context) {
	var drug Drug
	c.BindJSON(&drug)
	db.Create(&drug)
	c.JSON(200, drug)
}

func updateDrug(c *gin.Context) {
	id := c.Params.ByName("id")
	var drug Drug
	if err := db.Where("id = ?", id).First(&drug).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if err := c.BindJSON(&drug); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.Save(&drug)

	c.JSON(200, drug)
}

func deleteDrug(c *gin.Context) {
	id := c.Params.ByName("id")
	var drug Drug
	if err := db.Where("id = ?", id).First(&drug).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&drug)

	c.JSON(200, gin.H{"id": id, "message": "deleted"})
}

// CRUD operations for Items

func getItems(c *gin.Context) {
	var items []Item
	db.Find(&items)
	c.JSON(200, items)
}

func addItem(c *gin.Context) {
	var item Item
	c.BindJSON(&item)
	db.Create(&item)
	c.JSON(200, item)
}

func updateItem(c *gin.Context) {
	id := c.Params.ByName("id")
	var item Item
	if err := db.Where("id = ?", id).First(&item).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	if err := c.BindJSON(&item); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.Save(&item)

	c.JSON(200, item)
}

func deleteItem(c *gin.Context) {
	id := c.Params.ByName("id")
	var item Item
	if err := db.Where("id = ?", id).First(&item).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	db.Delete(&item)

	c.JSON(200, gin.H{"id": id, "message": "deleted"})
}
