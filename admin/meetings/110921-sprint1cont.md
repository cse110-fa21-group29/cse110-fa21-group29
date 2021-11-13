# Team Meeting Minutes #
Team Name/Number: Red Pands/29
Date: November 9, 2021
Time: 1:30pm
Location: Biomedical Library Room 207

Present:
- Avery
- Baha
- Edbert
- Jeffrey
- Fangcheng
- Haonan
- Viki
- Justin
- Tri
- Zhuoran
- Enzo

<br>

# Purpose of Meeting #
- Design updates
- Next steps/assigning tasks
- Deadlines for assigned tasks
- Development workflow
    - Assigning development tasks
    - Assigning deadlines for individual tasks
- Testing workflow
    - Assigning testers to design tests for development tasks
- Exploratory programming (if time permits)
    - Folder/file structure (defining each general folder)

<br>

# Decisions Made #
- Github Issues Assignments

<br>

# Agenda and Meeting Notes #
- Designer Progress
    - Homepage is done, ready for developers to create
    - Search, Recipe, Contributing almost done, needs a little more details
    - Recipe Page on Figma
        - Left page has steps without images
        - Right page has steps with images
    - 3 pages left
        - Hands free mode, about us, meal planner

<br>

- Assigned Tasks
    - Justin posted some issues on Githubs
        - Everyone determines how long their task will take by tomorrow
        - Core Issues:
            - Justin and Edbert:
                - Determine routing system for Single Page Application 
                - Determine folder/file structure for componenets 
                - Implement local storage for storing user cont. recipes
            - Jeffrey and Baha
                - Determine model for recipe & extract data from API JSON
        - Baha and Haonan
            - Implement testing CI/CD pipeline
        - Zhuoran
            - Implement common components 
            - Implement recipe details page        
        - Fangcheng
            - Implement contribute recipe form
            - Implement home page
        - Implement delete recipe functionality issue will be assigned later

<br>

- JSON files from Spoonacular API in source file on Github
    - Need to condense file so users do not have to load a giant file
    - Spoonacular also has health rating, so can sort on that

<br>

- Index DB API
    - For storing images

<br>

- Spoonacular API has limited categories on recipes
    - Options:
        - Could go through each recipe, and give categories to each of them
        - Could loop through recipe and create an algorithm