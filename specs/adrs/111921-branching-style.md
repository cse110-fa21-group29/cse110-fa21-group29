# Branching style

* Status: {accepted} <!-- optional -->
* Deciders: {Justin, Baha} <!-- optional -->
* Date: {2021-11-9} <!-- optional -->

## Context and Problem Statement

We need a branch structure to protect our main branch and offer organization for changes to our code.

## Decision Drivers <!-- optional -->

A viable solution must:
* Protect production code from breaking on code changes
* Create record of progress
* Not introduce too much complexity

## Considered Options

* Various

## Decision Outcome

Chosen option: 

3 branches/branch types
* `develop` - main development branch
* `release/[number]` - branch used to polish changes before launch to main
* `main` - production branch

### Positive Consequences <!-- optional -->

* Code in `main` is now protected, since all contributions to the repo should be pushed to `develop` first
* `release` branches provide history of development

## Pros and Cons of the Options <!-- optional -->

### Chosen option

* Protects `main`
* Records development progress in `release`
* Introduces minimal complexity, since there are only 3 branches/types of branches