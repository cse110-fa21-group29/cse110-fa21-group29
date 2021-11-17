import json

# function to parse through recipeInfoBulks
def parse_recipes():

    # list of parsed recipes
    recipes = []

    # loops through the list of bulk recipes
    for i in range(1, 5):
        source_dir = "source/models/json/"
        file_name = "recipesInfoBulk{}".format(i)

        with open("{}{}.json".format(source_dir, file_name)) as jsonFile:
            jsonObject = json.load(jsonFile)

            for recipe in jsonObject:

                # create recipe json
                currentRecipe = {}

                # create recipe groupings
                currentRecipe['metadata'] = {}
                currentRecipe['info'] = {}
                currentRecipe['categories'] = {}
                currentRecipe['nutrients'] = {}
                currentRecipe['description'] = ''
                currentRecipe['ingredients'] = []
                currentRecipe['steps'] = ''
                
                # add the spoonacularSourceURL
                currentRecipe['spoonacularSourceUrl'] = recipe['spoonacularSourceUrl']

                # metadata grouping
                currentRecipe['metadata']['id'] = recipe['id']
                currentRecipe['metadata']['title'] = recipe['title']
                currentRecipe['metadata']['author'] = recipe['creditsText']

                # sometimes the image does not exist, so do not add recipe if it does not
                try: currentRecipe['metadata']['image'] = recipe['image']
                except: continue

                # info grouping
                currentRecipe['info']['readyInMinutes'] = recipe['readyInMinutes']
                currentRecipe['info']['pricePerServings'] = round(recipe['pricePerServing'] / 100.0, 2)
                currentRecipe['info']['weightWatcherSmartPoints'] = recipe['weightWatcherSmartPoints']
                currentRecipe['info']['healthScore'] = recipe['healthScore']

                # categories grouping
                currentRecipe['categories']['vegan'] = recipe['vegan']
                currentRecipe['categories']['vegetarian'] = recipe['vegetarian']
                currentRecipe['categories']['glutenFree'] = recipe['glutenFree']

                # nutrients grouping
                currentRecipe['nutrients']['totalServings'] = recipe['servings']

                summary = recipe['summary']
                
                # calories parsing
                calories_index = summary.find('calories</b>')
                index = calories_index

                # loop till the ending carrot
                while True:
                    if summary[index : index+1] == '>': break
                    index -= 1;
                
                calories = summary[index+1 : calories_index-1]

                # protein parsing
                protein_index = summary.find('protein</b>')
                index = protein_index

                # loop till the ending carrot
                while True:
                    if summary[index : index+1] == '>': break
                    index -= 1;
                
                protein = summary[index+1 : protein_index-4]
                
                # fat parsing
                fat_index = summary.find('fat</b>')
                index = fat_index

                # loop till the ending carrot
                while True:
                    if summary[index : index+1] == '>': break
                    index -= 1;
                
                fat = summary[index+1 : fat_index-4]

                currentRecipe['nutrients']['calories'] = calories
                currentRecipe['nutrients']['protein'] = protein
                currentRecipe['nutrients']['fat'] = fat

                #description
                a_index = summary.find("<a")
                first_period = -1

                # get the first period before a_tag
                for i in range(a_index-1, 0, -1):
                    if summary[i : i+1] == ".":
                        first_period = i
                        break

                # parse out the <b> tags
                description = summary[0 : first_period+1]
                description = description.replace("<b>", "")
                description = description.replace("</b>", "")

                currentRecipe['description'] = description

                #ingredients
                for ingredient_object in recipe['extendedIngredients']:
                    currentRecipe['ingredients'].append(ingredient_object['originalString'])

                #steps
                instructions = recipe['analyzedInstructions']

                # no instructions given by the recipe, do not add recipe
                if len(instructions) == 0: continue

                currentRecipe['steps'] = recipe['instructions']

                # add current recipe to the list
                recipes.append(currentRecipe)

    # writes the json file as one line, not sure why but to format it I copied the one liner and pasted
    # it into a json linter online and then pasted back into the file
    with open("{}parsedRecipes.json".format(source_dir), 'w') as f:
        json.dump(recipes, f)


# add categories highProtein
def category_highProtein():
    file_name = 'source/models/json/parsedRecipes.json'

    with open("{}{}.json".format(source_dir, file_name)) as jsonFile:
        jsonObject = json.load(jsonFile)

# add categories healthy
def category_healthy():
    pass

def main():
    parse_recipes()

if __name__ == "__main__":
    main()