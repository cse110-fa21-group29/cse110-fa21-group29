# CI/CD Pipeline Phase 1


## What is Currently Functional
We have the following elements currently functional in our pipeline:

- Linting/Formatting
  - Using ESLint and Prettier
- Code Quality via Human Review
  - Justin will review the PR before allowing it to merge
- Web app preview
  - Using Firebase

1. Our pipeline starts from each person's IDEs
  - We install ESLint and Prettier to check each commit
    - If its an automatic fix or nothing is wrong, the individual will be able to commit. However, if something is wrong that ESLint nor Prettier cannot fix, it will error out, not allowing the user to commit.


2. Next, when a feature/bug is finished and the branch is merged with the latest version of our develop branch, a PR is made from the feature/bug branch into develop. Here is where the following github action jobs are run:
  - Linting/Formatting
    - Using ESLint and Prettier
  - Preview of our web app
    - Using Firebase


4. Finally, if all the checks have passed, Justin will review the PR and see if there are changes that need to be made before the branch can be merged.
  - If there are no changes, then the PR will be merged to the 'develop' branch
  - If not, then the people who made the PR will go back, fix the changes, and push them back to the branch, which would then re-start the checks/process in the PR


5. After several features/bugs have been implemented/fixed (usually at the end of each sprint), there will be a release version of our app. This means that we will then merge our 'develop' branch into our 'main' branch (our 'main' branch has our production code/web app)
  - Before 'develop' can be merged into 'main', the same checks as before have to pass, as well as the human review



## What is Planned

In order to produce code that is less error-prone and more production ready, we have the following checks planned for our pipeline:

**Automated Unit Tests**

To implement automated unit tests, we are planning to use Jest to write out unit tests (as shown in Lab 8) and then add a github actions job into our develop and main branch PR workflows.

**Automated Document Generation**

For automated document generation we are planning to use JSDocs. We will do this by implementing [JSDoc Action](https://github.com/marketplace/actions/jsdoc-action) and uploading the generated docs to github pages which will then be re-directed to our custom [docs domain](https://docs.yummyrecipesapp.com).

**Code Quality via Tool**

To implement the code quality check via a tool, we are planning to use [Codacy's github integration](https://docs.codacy.com/repositories-configure/integrations/github-integration/) (which is free when signing up with a public repo).
