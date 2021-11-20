# CSE 110 - Red Pandas - Local Environment Setup

[Back to Table of Contents](TABLE-OF-CONTENTS.md)

## Overview
This document covers the necessary requirements to get your local environment up and running. It will cover the following topics:
1. Git setup
2. Linter setup (`eslint` and `prettier`)

## Git setup
Please run the following command to ensure that your `git pull develop` commands do not create weird merge commits:
```shell
# Set 'git pull' to only fast forward. This ensures we do
# not make any developmental changes to the 'develop' branch.
# Only run this command once.
git config pull.ff only
```

## Linter setup
NOTE: Please ensure you had `npm` installed. If you do not, please install it.

Please run the following commands to ensure that your npm setup and linter setup is correct:
```shell
# Install all required packages from 'package.json'.
npm install

# Install git pre-commit hook to run linters.
npx husky install
```