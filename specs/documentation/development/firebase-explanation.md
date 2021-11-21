# CSE 110 - Red Pandas - Firebase Explanation

[Back to Table of Contents](README.md)

## Overview
This document covers the database and hosting features of Firebase.

## Topics
* Firebase database
* Firebase hosting

## Firebase database
We are using Firebase to host our external database.
* The database contains a representation similar to JSON with all of the recipes (both initial AND user-contributed ones).
* The initial JSON files from the Spoonacular API have been imported into the database as our starting data.

INSERT MORE INFO ABOUT HOW THE `core/database/database.js` FUNCTIONS WORK


## Firebase hosting
We have 3 websites currently running (the first 2 are hosted on Firebase, the last is hosted on GitHub pages):
1. [yummyrecipesapp.com](yummyrecipesapp.com): This is linked up to the `main` branch's code, and has its own production Firebase database.
2. [dev.yummyrecipesapp.com](dev.yummyrecipesapp.com): This is linked up to the `develop` branch's code, and has its own development Firebase database.
3. [docs.yummyrecipesapp.com](docs.yummurecipesapp.com): This is linked up to the `gh-pages` branch's code, and represents our JSDocs documentation.