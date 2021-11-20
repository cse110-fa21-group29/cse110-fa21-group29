# CSE 110 - Red Pandas - Development Folder Structure

## Overview
This document covers the way our repo is structured from a development standpoint.

### Topics discussed
* Source folder structure
* Other relevant files

## Source folder structure
Inside the `source/` folder, we have the following files/folders:
* `components/`: All of the interface code (HTML/CSS/JS) for every page on the site. Each component of the site has its own folder inside `source/components/`.
* `core/`: All of the core functionality of the site (code that applies everywhere).
  * `core/routing/`: The router functionality (see [router explanation](./router-explanation.md)).
  * `core/database/`: The database functionality (see [firebase explanation](./firebase-explanation.md)).
* `models/`: The code we used to model the initial JSON for our recipes.
  * `models/json/`: The raw and parsed JSON files directly from the Spoonacular API.
  * `models/scripts/`: Any scripts used to parse the JSON.
* `static/`: Any static files that should be available on the site.
  * `static/common/`: Common static files (default recipe image, etc.)
  * `static/font-awesome/`: Font awesome icon pack library
  * `static/[component-name]/`: Any images, etc. that are specific to that component.
* `index.html`: The initial HTML file that is rendered when the user goes to the site. It imports the global styling, core JS files, and component JS files.
* `main.js`: Any global JS that should be run (unused at the moment).
* `styles.css`: Any global styling that should apply to the whole page.

## Other relevant files
The following are other relevant files that are NOT in the `source/` folder. Instead, they are in the root of the repo:
* `README.md`: Our repo's README file.
* `package.json`: Contains info about any packages we have installed via `npm`.
  * The command `npm install` reads from this file.
* `package-lock.json`: A version-specific record of all packages _and their dependencies_. Not as useful for us.
* `firebase.json` and `.firebaserc`: Configuration for firebase hosting.
* `.gitignore`: Specifies any files/folders to NOT commit onto GitHub.
* `.eslintrc.js`: Configuration for the `eslint` linter.
* `.prettierignore`: Specifies any files/folders to for the `prettier` to NOT run on.
* `.prettierrc.json`: Configuration for the `prettier` formatter.
* `config.json`: Configuration for the firebase database.
