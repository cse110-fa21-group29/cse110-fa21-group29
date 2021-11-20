# CSE 110 - Red Pandas - Branching and Committing

[Back to Table of Contents](TABLE-OF-CONTENTS.md)

## Overview
This documentation covers the standards we are using to organize our branches and commits. It will discuss the following topics:
1. Branches
2. Branch naming
3. Commit naming

## Branches
We have 6 branch types in our repo:
1. `feat/[number-feature]`: These represent our _feature branches_.
   1. All new changes to our site will be on these branches.
   2. Each branch corresponds to a particular GitHub issue.
   3. These MUST follow the naming scheme described below.
   4. See the general development workflow for how to create and merge a feature branch.

2. `fix/[number-fix]`: These represent our _fix branches_.
   1. All new bug fixes to our site will be on these branches.
   2. Each branch corresponds to a particular GitHub issue, specifically bug reports.
   3. These MUST follow the naming scheme described below.
   4. The workflow to create and merge a fix branch is the same as a feature branch.

3. `develop`: Represents the DEVELOPMENT codebase. This is directly linked to the subdomain dev.yummyrecipesapp.com so any push to `develop` automatically deploys the changes to the DEV website.
   1. This branch is NOT protected, meaning any one can push to it directly without creating a PR first.
   2. However, please ONLY push non-development files directly to `develop`. All development changes should be made with PRs.
   
4. `main`: Represents the MAIN (LIVE) codebase. This is directly linked to the domain yummyrecipesapp.com so any push to `main` automatically deploys the changes to the MAIN website.
   1. This branch is _protected_, meaning no one can push to it directly without creating a PR first.

5. `releases/[number]`: These branches don't exist just yet, but will be used as a "bridge" between the `develop` and `main` branches when we actually want to go live.
   1. These branches will serve as preparation branches and will include stuff like changing the version number, modifying an API key to the main database, etc.
   2. All commits on these branches will be merged into both `develop` and `main`.

6. `gh-pages`: This branch represents our documentation. Right now, this is currently a WORK-IN-PROGRESS.
   1. This branch represents the latest JSDocs, and will be visible at docs.yummyrecipesapp.com. It is hosted via GitHub pages.

## Branch naming
All feature and fix branches (1st and 2nd types listed above) should follow this naming scheme:

`feat/123-around-six-words-about-the-issue`

`fix/456-around-six-words-about-the-bug`

The number represents the GitHub issue number for the feature or bug report.

## Commit naming
All commits should follow the naming scheme below. This is loosely based off of the commitlint standard:

`type(scope): a short message about the changes`

The commit name consists of 4 parts:
1. `type`: The type represents the overall type of the commit. It is typically one of four types:
   * `feat` — New feature
   * `fix` — Bug, typo, test fix
   * `test` — Tests
   * `docs` — Any documentation, including meeting notes, mockups, etc.
2. `scope`: The scope represents the topic of the commit. You can name this whatever fits the best with your changes, but here are some suggestions:
   * `core` — Anything that’s more general and relates to the overall project
	* `admin` — Meeting notes or anything for the `/admin` folder
	* `specs` — Mockups, sketches, or anything for the `/specs` folder
	* `pipeline` — Changes to the CI/CD pipeline
	* `home-page` - Changes to the home page
   * `nav-bar` - Changes to the nav bar
	* `details` - Changes to the recipe details page
	* `contribute` - Changes to the recipe contribute page
	* `meal-planner` - Changes to the meal planner page
	* `search` - Changes to the search page
	* `database` - Changes to the database functionality
	* `router` - Changes to the router
3. `a short message about the commit`: This is pretty self-explanatory, but please provide some concise details about what you changed.
   * Please keep this _lowercase_