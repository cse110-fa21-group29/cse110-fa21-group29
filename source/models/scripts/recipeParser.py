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
                
                # if there are more than 2 steps, do not include the recipe
                if len(recipe['analyzedInstructions']) >= 2:
                    print(recipe['id'])
                    continue

                # create recipe json
                currentRecipe = {}

                # create recipe groupings
                currentRecipe['metadata'] = {}
                currentRecipe['info'] = {}
                currentRecipe['categories'] = {}
                currentRecipe['nutrients'] = {}
                currentRecipe['description'] = ''
                currentRecipe['ingredients'] = []
                currentRecipe['steps'] = []
                
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

                # parse analyzed instructions into a list
                instructions = instructions[0]['steps']
                for step in instructions:
                    currentRecipe['steps'].append(step['step'])

                # add current recipe to the list
                recipes.append(currentRecipe)

    # writes the json file as one line, not sure why but to format it I copied the one liner and pasted
    # it into a json linter online and then pasted back into the file
    with open("{}newParsedRecipes.json".format(source_dir), 'w') as f:
        json.dump(recipes, f)


# add categories highProtein
def category_highProtein():
    file_read = 'source/models/json/newParsedRecipes.json'
    file_write = 'source/models/json/0newParsedRecipes.json'

    with open(file_read) as jsonFile:
        jsonObject = json.load(jsonFile)
        high_protein_amount = 35

        # loop through and add highProtein category
        for index, recipe in enumerate(jsonObject):
            recipe['categories']['highProtein'] = False
            protein = recipe['nutrients']['protein']

            # set highProtein category to True
            if int(protein[0:len(protein)-1]) >= high_protein_amount:
                recipe['categories']['highProtein'] = True
    
    with open(file_write, 'w') as f:
        json.dump(jsonObject, f)

# add categories healthy
def category_healthy():
    file_read = 'source/models/json/0newParsedRecipes.json'
    file_write = 'source/models/json/0newParsedRecipes.json'

    with open(file_read) as jsonFile:
        jsonObject = json.load(jsonFile)
        healthy_amount = 100

        # loop through and add healthy category
        for index, recipe in enumerate(jsonObject):
            recipe['categories']['healthy'] = False
            health_score = recipe['info']['healthScore']

            # set healthy category to True
            if health_score >= healthy_amount:
                recipe['categories']['healthy'] = True
    
    with open(file_write, 'w') as f:
        json.dump(jsonObject, f)

def main():
    category_highProtein()
    category_healthy()

if __name__ == "__main__":
    main()