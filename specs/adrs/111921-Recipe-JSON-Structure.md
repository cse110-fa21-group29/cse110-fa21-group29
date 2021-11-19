# {Recipe JSON Structure}

* Status: {accepted} 
* Deciders: {Baha, Jeffrey} 
* Date: {2021-11-17} 

Technical Story: {Determining Structure of JSON that contains recipe info | https://github.com/cse110-fa21-group29/cse110-fa21-group29/projects/1#card-72538706} 

## Context and Problem Statement
The original JSON from Spoonacular is incredibly long, and needs to be reduced so that load times are not too long. We need to shrink the file, but retain the necessary information to illustrate the recipe card. 

## Decision Drivers <!-- optional -->

* Need to include this necessary information:
* Title Information. Statistics on the meal. Nutrient info. Types of diets it fits into. Steps. Summary. 
* 

## Considered Options

* Break down into subgroups. Metadata, Info, Categories, Nutrients, Description, Ingredients, Steps.
* All items as individual fields in the JSON. 
* Three separate groups: General Info, Directions related, Statistics. 
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: Option 1, because this provided the most effective and efficient organization among all considered options. See details below for further justification. 

### Positive Consequences <!-- optional -->

* Provided the most useful information for developers to be ready to use right now. Parsing the steps and ingredients beforehand will allow the developers to more quickly organize and implement the recipes into the application sooner. 
* Includes dietary information that will allow us to organize by type of diet someone is following.
* Includes health scores on meal to allow our demographic to eat the recipes that are deemed healthy

### Negative Consequences <!-- optional -->

* Steps were parsed as well as possible, but will still require some work to separate efficiently. In certain occasions, Spoonacular broke the steps into separate lists that needed to be combined, and an efficient way to combine these recipes was not easily found. 