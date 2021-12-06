# {short title of solved problem and solution}

* Status: {accepted} <!-- optional -->
* Deciders: {team} <!-- optional -->
* Date: {2021-10-DD} <!-- optional -->

## Context and Problem Statement

Our app allows users to create, update, and delete recipes in a shared database. We need to decide whether to implement a user system.

## Decision Drivers <!-- optional -->

* Complexity of implementation
* Relevance to intended app usage

## Considered Options

* Google Identity
* Self-developed authentication
* forgo auth implementation

## Decision Outcome

Chosen option: forgo OAuth implementation, because of limited time for development.
Ideally, we would have user authentication to prevent malicious use of the app and make it so users can only edit or delete their own recipes.
However, given the limited time of the quarter, we decided to focus on our CRUD features and simpler secondary features.
If we were to implement user authentication, we would either use a 3rd party authentication system such as option 1, or develop our own (option 2). 

### Positive Consequences <!-- optional -->

* Allows developers to focus on CRUD features

### Negative Consequences <!-- optional -->

* If we were to publically deploy without user system, database would be open to malicious modification

## Pros and Cons of the Options <!-- optional -->

### Google Identity

{[Documentation](https://developers.google.com/identity/sign-in/web/sign-in)<!-- optional -->}

Pros:
* Resolves issue of open database access 
* Existing API and credential system
* Easy to develop for

Cons:
* Additional dependency

### Self-developed authentication

A secure user development system would add complexity to our client-server model.
For username and password authentication, we would need a private keystore and truststore in addition to our existing database.

Client and server would present and verify certificates to each other before sending protected resources.

[Oracle examples](https://docs.oracle.com/cd/E17802_01/j2ee/j2ee/1.4/docs/tutorial-update2/doc/Security5.html)

Pros:
* Resolves issue of open database access 
* No additional dependency
  
Cons:
* Significant development cost

### Forgo auth implementation

Given the time constraints of the project, this option saves the most development budget.

Pros:
* Save development time for CRUD features

Cons:
* Database access remains open

<!-- markdownlint-disable-file MD013 -->
