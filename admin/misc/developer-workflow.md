# CSE 110 Project Developer Workflow
## Issue Management
1. During sprint meeting, decide on features to implement during sprint.
2. Afterwards, team leaders or lead developer will create GitHub issues for each **development task**
	* Should be broken down to smaller chunks
	* Should have a title, basic description, link to mockup (if needed)
	* Should be assigned to a developer, labelled
	* Each issue will automatically be added to the "To Do" column
	* Bugs should be in separate GitHub issues and have a separate branch for the bug fix

## Workflow While Developing
0. __NOTE__: For all non-development contributions, feel free to directly push to master (no need for branches, PRs, approvals), but please do follow the commit format without the issue #
   * `docs(admin): add meeting notes`
1. __NOTE 2__: Please do frequent pulls! If you see that other features were merged into `main` and your feature branch isn’t up-to-date with those changes, feel free to merge `main` into your branch at any time and as many times as you need.
	* The VSCode plugin “Git Graph” makes this process really easy!
2. When a developer works on a new feature/issue, they will create a branch off of `main` 
	* The branch must have the following format: `type/[issue#]-up-to-six-words-about-issue`
		* The type represents the overall type of the branch:
			* `feat` — New feature
			* `bug` — Bug fix
				* If it’s too hard to describe the bug, just put the issue # as the name of the branch
		* Examples of branch names:
			* `feat/5-recipe-add-form`
			* `feat/10-hands-free-mode`
			* `feat/6-initial-menu-bar`
			* `bug/17-repeated-recipes`
			* `bug/12`
3. The developer will also move the issue from “To Do” to “In Progress”
4. The developer will add commits with their work (specific to this feature)
	* When code is committed, we will use `prettier` (code formatting) and `eslint` (preventing bugs/unnecessary code) to ensure consistency
		* These tools work automatically, and will modify your code as you are committing
		* If there is something that it doesn’t like but it too complex to automatically fix, it will prevent you from committing and leave a detailed error message
		* Both of these tools will also be run against the final PR as a check, so if this is not followed for some reason, we can fix that ASAP
	* The commits should be small and focused on a particular piece of the feature being implemented
	* Each commit should have the following format (all lowercase please):
`type(scope): a few words about the commit (github issue #)`
		* The `type` represents the overall type of the commit:
			* `feat` — New feature
			* `fix` — Bug, typo, test fix
			* `test` — Tests
			* `docs` — Any documentation, including meeting notes, mockups, etc.
		* The `scope` represents what the commit is actually changing in the repo:
			* `core` — Anything that’s more general and relates to the overall project
			* `admin` — Meeting notes or anything for the `/admin` folder
			* `specs` — Mockups, sketches, or anything for the `/specs` folder
			* `recipes` — Anything related to recipes
			* `comments` — Anything related to comments on the recipes
			* `search` — Anything related to the search functionality
			* `media` — Anything related to managing images or videos
			* `meal-planner` — Anything related to the meal planner functionality
			* `ui` — Anything related to a UI change (hands-free mode, print friendly mode, PDF export)
		* After the `type(scope): `, include a few words in lowercase only about the content of the commit
			* i.e. `add quick facts box to recipe page`
			* Try to write it as if you were saying “I want to… [insert description]” as opposed to past tense
		* After the description, put the GitHub issue number in parentheses
			* i.e. `(3)`
	* Full commit name examples:
		* `feat(meal-planner): add meal planner model interface (5)`
		* `fix(ui): fix typo on hands-free mode (7)`

## Workflow When Complete
1. It is important to keep your local branches up to date. In order to do this, before you start a PR, please do the following:
```shell
# Set 'git pull' to only fast forward. This ensures we do
# not make any developmental changes to the 'develop' branch
git config pull.ff only

# Pull the remote 'develop' branch into your local 'develop' branch
git pull origin develop

# If there were any new commits, merge them from `develop` and update your branch
git checkout new-feature
git merge develop
git push origin new-feature
```
2. When the feature is completed and up to date with the remote 'develop' branch, create a new Pull Request for the feature branch
	* The PR should have a name and a short description of what the branch actually contains
	* The PR should be labelled and linked to the relevant GitHub issue
	* The developer should move the issue from "In Progress" to "Ready for Review"
3. If the automated checks on the PR (linter, tests) fail, the developer should investigate and commit any necessary changes
4. When ready, the developer should request review from Justin
5. Within 24 hours, Justin will review the PR and either approve it or suggest changes
	* If changes are suggested, developers should implement changes or ask for clarification within 24 hours
		* When changes are complete, the conversations should be marked as complete and the PR should be re-requested for review by Justin
	* If PR is approved, Justin will merge the branch into `develop`, which will close the PR and relevant issue
		* This will automatically move the issue from “Ready for Review” to “Done”



## 
