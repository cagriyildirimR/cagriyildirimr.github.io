---
layout: default
title: Gorm
nav_order: 5
---

# Gorm

{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Introduction

GORM is a code library that provides a simple and powerful interface for interacting with databases in the Go programming language.

<!-- ~~~Go

~~~ -->

### CRUD
~~~Go
// User represents a user in the database
type User struct {
	gorm.Model
	Name  string
	Email string
}

func main() {
	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Migrate the schema
	db.AutoMigrate(&User{})

	// Create
	db.Create(&User{Name: "John", Email: "john@example.com"})

	// Read
	var user User
	db.First(&user, 1) // find user with id 1
	fmt.Println(user)

	// Update - update user's email
	db.Model(&user).Update("Email", "john@gmail.com")

	// Delete - delete user
	db.Delete(&user)
}
~~~


