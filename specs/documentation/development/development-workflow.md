# CSE 110 - Red Pandas - Development Workflow

[Back to Table of Contents](TABLE-OF-CONTENTS.md)

## Overview
This document covers the workflow that all developers should follow.

### Topics discussed
1. Issue creation
2. Feature branch creation
3. Creating a PR

## Issue creation
1. During each sprint meeting, we will decide on the features to implement during the sprint.
2. Afterwards, the team leaders or lead developer will create GitHub issues for each **development task**
   * Should be broken down to smaller chunks
   * Should have a title and basic description
   * Should be assigned to a developer and labelled correctly
   * Each issue will automatically be added to the "To Do" column
   * Anyone can add their own tasks afterwards. This is just to get us started on the necessary tasks.
  
## Feature branch creation
1. When a developer begins work on a GitHub issue, they will move the issue to "In Progress" and create a feature branch off of the latest `develop` branch.
   1. It is important to ensure that your local `develop` branch is up to date with the `develop` branch on GitHub. It is very likely that features have been added since you last updated the branch.
   2. To update your `develop` branch to the latest changes, please run the following commands:
   ```shell
   # Ensure you are currently on the 'develop' branch.
   git checkout develop

   # Pull the remote 'develop' branch into your local 'develop' branch. 
   # This updates your local branch with the latest changes.
   git pull origin develop
   ```
2. Create a new feature branch off of `develop`.
  ```shell
  # Create a new feature branch (i.e. 'feat/123-my-feature')
  git checkout -b feat/123-my-feature
  ```
3. Make sure all of your commits for this feature are pushed to this branch.
4. Periodically, make sure you pull the latest changes from `develop` into your feature branch. To do so, run the following commands:
  ```shell
  # Ensure you are currently on the 'develop' branch.
  git checkout develop

  # Pull the remote 'develop' branch into your local 'develop' branch. 
  # This updates your local branch with the latest changes.
  git pull origin develop

  # If there were any new commits, merge them from `develop` and update your branch.
  git checkout feat/123-my-feature
  git merge develop
  git push origin feat/123-my-feature
  ```

## Creating a PR
1. When the feature branch is complete, the developer will first update their branch with the latest changes from `develop`.
   1. To merge the latest changes into your branch, please run the following commands (same as above):
   ```shell
   # Ensure you are currently on the 'develop' branch.
   git checkout develop

   # Pull the remote 'develop' branch into your local 'develop' branch. 
   # This updates your local branch with the latest changes.
   git pull origin develop

   # If there were any new commits, merge them from `develop` and update your branch.
   git checkout feat/123-my-feature
   git merge develop
   git push origin feat/123-my-feature
   ```
2. When the branch is up to date, the developer will open a new Pull Request (PR) and move the issue to "Ready for Review".
   * The PR should be merging `feat/123-my-feature` into `develop` (NOT `main`).
   * The PR should have a name and basic description.
   * The PR should have the phrase "Closes #123" at the end of the description.
3. The developer will request Justin (and/or any other developer) as a PR reviewer.
4. If a reviewer has provided suggestions, the developer will fix them.
5. If a reviewer has approved the PR, Justin will merge the PR into `develop` once all of the checks are passing.
6. The related issue will be closed and moved to "Done" on the board.