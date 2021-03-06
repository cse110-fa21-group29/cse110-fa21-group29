# {CI/CD Pipeline}

* Status: {accepted} <!-- optional -->
* Deciders: {Primary Deciders: Baha, Justin. All other members were able to contribute} 
* Date: {2021-11-18 when the decision was last updated} <!-- optional -->

Technical Story: {description | ticket/issue URL} <!-- optional -->

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.}
The CI/CD pipeline is meant to be an infrastucture that helps that build, test and deploy code by using automation. An effective engineering team will have certain checks and balances established in order to ensure that all code inside the repo is acceptable. 
 

## Decision Drivers 
For the purpose of this project, we must have these infrastructures established: 
* linting and code style enforcement (1)
* code quality via tool (2)
* code quality via human review (3)
* unit tests via automation (4)
* documentation generation via automation (5)

## Decisions

1. **commitlint** for commit styling standards. **eslint** and **prettier** for linting (Decided 11/6/2021)
2. TBD as of 11/19/2021.
3. Justin will conduct human review for code quality. (Decided 11/6/2021)
4. Jests for automated unit tests. (Decided 11/18/2021)
5. JSDocs for automated documentation generation. (Decided 11/18/2021)
Chosen option: "{option 1}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

## Pros and Cons of the Chosen Structures <!-- optional -->

### linting and code style enforcement

CommitLint, EsLint and Prettier are linting and code style enforcement tools we are using. 

* CommitLint Pro: It gives us consistency with our version control
* CommitLint Con: Might be overkill potentially 
* EsLint & Prettier Pro: It gives us consistency with our code formatting
* EsLint & Prettier Con: Might force us to use a standard we don’t like and we’d have to spend time overriding it

### code quality via tool (TBD)

{example | description | pointer to more information | …} <!-- optional -->

* Good, because {argument a}
* Good, because {argument b}
* Bad, because {argument c}
* … <!-- numbers of pros and cons can vary -->

### code quality via human review

Justin will conduct human reviews. 

* Pro: One person that reviews code will provide consistency in review style and what they're looking for
* Con: Potentially delays turnover with only one person conducting human reviews. 
* Con: Potentially provides too much of a workload on Justin for the future of the project. (Edbert agreed to step in with human reviews if necessary)


### unit tests via automation

Jest will be the chosen unit testing tool 

* Pro: Recommended by class 
* Pro: Unit Testing tool that the team is most familiar with 


### documentation generation via automation

JSDocs will be the automated documentation generation tool used. 

* Good, because {argument a}
* Good, because {argument b}
* Bad, because {argument c}
