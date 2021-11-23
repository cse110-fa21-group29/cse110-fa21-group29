# CSE 110 - Red Pandas - Firebase Explanation

[Back to Table of Contents](README.md)

## Overview
This document covers the database and hosting features of Firebase.

## Topics
* Firebase database
* Using the database
* Firebase hosting

## Firebase database
We are using Firebase to host our external database.
* The database contains a representation similar to JSON with all of the recipes (both initial AND user-contributed ones).
* The initial JSON files from the Spoonacular API have been imported into the database as our starting data.

The development database can be viewed [here](https://console.firebase.google.com/u/0/project/cse110group29dev/database/cse110group29dev-default-rtdb/data) (Ask a team lead if you don't have access).

## Using the database
To use database functionality, first import [`database.js`](/source/core/database/database.js) into your JS file.

`import { Database } from "/source/core/database/database.js";`  

Then, create an instance of the `Database` class.

`const db = new Database();`

There are three functions you can utilize:
* `getRecipes`  
Returns an array of all recipe objects in the database.

* `pushRecipe(recipe)`  
Push a recipe object to the end of the database.  
Although any object can be pushed, please only push valid recipes.

* `updateRecipe(recipe, index)`  
Replace a recipe object at the specified index in the database.  
Although any object can replace a recipe, please only serve valid recipes.

* `deleteRecipe(index)`  
Delete recipe object at the specified index in the database.

Note, these are all `async` functions so you may need to use keywords such as `await`.


Also see: [JSDocs](https://docs.yummyrecipesapp.com/Database.html) and comments in [`core/database/database.js`](/source/core/database/database.js)


## Firebase hosting
We have 3 websites currently running (the first 2 are hosted on Firebase, the last is hosted on GitHub pages):
1. [yummyrecipesapp.com](yummyrecipesapp.com): This is linked up to the `main` branch's code, and has its own production Firebase database.
2. [dev.yummyrecipesapp.com](dev.yummyrecipesapp.com): This is linked up to the `develop` branch's code, and has its own development Firebase database.
3. [docs.yummyrecipesapp.com](docs.yummurecipesapp.com): This is linked up to the `gh-pages` branch's code, and represents our JSDocs documentation.
