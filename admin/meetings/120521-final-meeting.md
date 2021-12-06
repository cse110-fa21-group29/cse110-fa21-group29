# Team Meeting Minutes
Team Name/Number: Red Pandas/29  
Date: December 5, 2021  
Time: 3:10pm  
Location: Biomedical Library 206

## Attendance

### Present
- Baha
- Edbert
- Avery
- Justin
- Tri
- Jeffrey
- Haonan
- Fangcheng
- Zhuoran
- Viki

### Absent
N/A

## Purpose of Meeting 
- Review all of our progress and debug.

## Decisions Made
N/A

## Agenda and Meeting Notes
- Review core functionality
  - Specifically:
    - General Font for Webpage, instead of default
    - Have the dome picture be the default image for all 
    recipes with no given image
    - Make shadow smaller for cards
    - Cooking-Mode (Avery):
        - Style Suggestions:
            - Need margin for the buttons
            - Wider buttons
            - Top margin for all boxes
            - Bigger Font Size
            - Space after colons
            - For Timer
                - make hours, minutes, seconds button and input bigger
                - add spacing 
    - Recipe Details Page (Justin):
        - Style Suggestions:
            - Add margin between link and buttons under it
            - For categories section
                - change bullet points to more like Github issues design
                - move them under the title
            - Cap the title at 2 lines if 2 long and add ... at the end 
            - Change link to "link to article" and put under Author Name
            - Add "By [Author Name]", and cap at one line
            - Change Hands-Free to Cooking-Mode
            - Remove timer from details page
            - Change title from underline to bold and remove colon
            - For video, have it be toggled in the directions, so the video will take over the entire direction box
    - Recipe Contribute Page (Justin):
        - Style Suggestions:
            - For description and ingredients, change font
            - Change cancel button to some sort of grey color
            - Make categories centered to checkbox
            - Photoshop text Insert Image on top of the cover image picture
            - Right align cancel button
    - Home Page (Zhuoran):
        - Style Suggestions:
            - Change title font to Sophia
            - Maybe add transparent black line across entire picture
            - For titles, options:
                - instead of rectangle, make the right end into a flag
                - or round the corners like how the recipe cards are rounded
            - Move categories to left align with the first recipe card in the grid and make it similiar design to Github issues
            - Remove About Us and shrink team logo and add to Footer
            - Ensure that recipes in grid are not duplicated
    - Home Page Nav Bar (Baha):
        - Style Suggestions:
            - Remove search bar and add an Search button to lead to search page
            - Remove the category button
            - Change order of buttons to, About Us -> Contribute Recipe -> Meal Planner -> Search
            - Move About Us more to the right, away from Yummy Recipes
            - Try different hover animations, see which one looks better like underline
            - At some width, before yummy recipes overflows, change it to team logo and link it
    - About Us:
        - Style Suggestions: 
            - Align description to picture
            - Make description bigger
            - Bold "We Are The Red Pandas"
            - Shrink white border around the entire page
            - Make Our Story and Our Team boxes smaller
    - Search (Fangcheng)
        - Style Suggestions:
            - For search Page:
                - Style search bar to rounded corners
                - Make Submit button pink and round the corners
                - Fix the last recipe on very botton so it does not go into footer
                - Make search bar and submit button bigger to align to recipe cards
            - For Filter Popup Page:
                - Spacing between min and max
                - Align min and max boxes
                - Make sure its clear that Categories is with the checkbox and Sort is with the time/cost buttons
                - Padding right and top of the X
                - Remove submit query button
                - Style buttons 
                - Align filter menu to filter button
                - Rounded Corners
                - upperCase first letter for all filter options
    - Meal Planner (Edbert)
        - Style Suggestions:
            - Add Suggestions to Github Issues
            - Copy Clipboard image and functionality next to print button
            - Make print button bigger
            - Default print layout to landscape
            - Lines disappear between Wednesday and Thursday in print preview
            - Number and units be in same line when search pops up
            - lowercase c in calories and add units to nutrition
            - Have fixed sidebar width
- What people plan on doing
  - Baha: Finish Codacy issues, fix navbar, add more E2E tests
  - Haonan: Add comments to code that have no comments
  - 
- Review testing
  - Everyone: Check the functions you wrote and make comments if not and do JSDocs format. 
- Review documentation
  - Is all code commented?
  - Anything more need to be written?
  - Should we refactor code?
- Discuss bug-finding procedure
  - Go to dev site and try to break it
  - When reporting the bug issue on Github, say what page you are on and say the steps you took to get the bug. What you expected to happen and what actually happend. Screenshot any relevant console errors if any
- If the webpage is smaller than 1024 width and 576 height, do not worry about styling
- Planning out the coming week
  - Sunday (today): All features should be done
  - Monday: Report bugs found to Github Issues night of, comment code you have written if there is no code
  - Tuesday: Bug-fixing/styling
  - Wednesday: Only styling
  - Thursday: Video (No more new code)