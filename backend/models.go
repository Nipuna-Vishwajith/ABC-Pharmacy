package main

import "github.com/jinzhu/gorm"

type Drug struct {
    gorm.Model
    Name        string
    Description string
}
