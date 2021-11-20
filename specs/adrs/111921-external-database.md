# Choosing an External Database for Storage

* Status: {accepted} <!-- optional -->
* Deciders: {Edbert, Jeffrey} <!-- optional -->
* Date: {2021-11-10} <!-- optional -->

Technical Story: {Firebase setup | https://github.com/cse110-fa21-group29/cse110-fa21-group29/issues/42} <!-- optional -->

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.}
The application requires some form of storage for CRUD functions. We need to determine whether to use local storage or an external database, and if we use an external database, we need to determine which one.

## Decision Drivers <!-- optional -->

* Data synchronization
* Data organization
* Implimentation difficulty

## Considered Options

* External database
* Local storage

## Decision Outcome

Chosen option: "External database", because 

### Positive Consequences <!-- optional -->

* Strong synchronization of recipes and DB structure
* Simplification of CRUD features to DB queries

### Negative Consequences <!-- optional -->

* Time costs associated with learning Firebase

## Pros and Cons of the Options <!-- optional -->

### External Database

Firebase as our external database <!-- optional -->

Pros:
* Database is a single source of truth for recipe data.
  * Database structure and recipes stay synchronized between clients
* Simplifies CRUD features to DB queries
* Saves browser storage
* Allows for features like comments

Cons:
* Extra dependency
* More difficult initial implimentation
* Requires migration from JSON recipe data to DB
* Learn how to use firebase

### Local Storage

Pros:
* Instantaneous queries
* No new dependencies
* Developer familiarity

Cons:
* Extremely difficult to update and/or synchronize database structure and content
* Potential storage issues, depending on volume of recipes

<!-- markdownlint-disable-file MD013 -->
