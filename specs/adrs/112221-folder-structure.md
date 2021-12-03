# {short title of solved problem and solution}

* Status: {accepted}
* Deciders: {Justin} <!-- optional -->
* Date: {2021-11-01} <!-- optional -->

## Context and Problem Statement

We need a consistent structure for our repo in order to maintain development efficiency and style conformity.

## Decision Drivers <!-- optional -->

* Intuitive structure
* Files are easy to find when needed
* Consistent

## Considered Options

* Various

## Decision Outcome

Chosen option:

Code goes in the `source` folder, which is organized as follows:
* `components` - Each major component of the interface and its files are within its own folder within the `components` folder.
* `core` - core related files, such as routing binaries will be within their own subfolders here
* `models` - contains the models for recipes
* `static` - will contain static files, such as brand images, icons, etc.

### Positive Consequences <!-- optional -->

* Repo easier to navigate
* Components encapsulated in file structure

## Pros and Cons of the Options <!-- optional -->

### Chosen Structure

* Straightforward
* Easy to find all files related to a given component
* Might require change to group future categories of functions
