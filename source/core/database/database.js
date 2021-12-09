import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

// Database credential file
const configFile = "/config.json";

/** Class that interfaces with the Firebase realtime database. */
export class Database {
  /**
   * Fetches a single recipe object from database.
   *
   * @async
   * @param {number} index - The index of the recipe in the database.
   * @returns {(Object|undefined)} A recipe object or undefined if index is undefined.
   */
  async getRecipe(index) {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Get the recipe
    let recipe = {};

    await get(child(dbRef, `recipes/${index}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          recipe = snapshot.val();
        } else {
          recipe = undefined;
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return recipe;
  }

  /**
   * Fetches all recipe objects from database.
   *
   * @async
   * @returns {Array} An array of recipe objects.
   */
  async getRecipes() {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Get all recipes
    let recipes = [];

    await get(child(dbRef, `recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          recipes = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return recipes;
  }

  /**
   * Pushes recipe object to database in the next index.
   *
   * @async
   * @param {Object} recipe - An object that contains the recipe data.
   * @returns {number} Index of pushed recipe in database.
   */
  async pushRecipe(recipe) {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Get all recipes to assess the length of the object
    let recipes = [];

    await get(child(dbRef, `recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          recipes = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Write parameter recipe object to the next index
    set(ref(database, "recipes/" + recipes.length), recipe);

    return recipes.length;
  }

  /**
   * Replaces recipe data at index with object specified in the parameter.
   *
   * @async
   * @param {Object} recipe - An object that contains the recipe data.
   * @param {number} index - The index of the recipe to replace.
   */
  async updateRecipe(recipe, index) {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Replace recipe data at index with parameter recipe object
    set(ref(database, "recipes/" + index), recipe);
  }

  /**
   * Write a value to a key in a recipe.
   *
   * @async
   * @param {string} data - A string that contains the data to write.
   * @param {number} index - The index of the recipe in the database.
   * @param {string} path - The path of the key in the recipe (e.g. "metadata/title").
   */
  async writeData(data, index, path) {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Update key with new value
    set(ref(database, "recipes/" + index + "/" + path), data);
  }

  /**
   * Deletes recipe data at index specified in the parameter.
   *
   * @async
   * @param {number} index - The index of the recipe to delete.
   */
  async deleteRecipe(index) {
    // Fetch database credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize database connection
    const app = initializeApp(config.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());

    // Delete recipe data at index with parameter
    set(ref(database, "recipes/" + index), null);
  }

  /**
   * Brute force search that returns all recipes for which
   * any words in the input string match. Then filters the searched
   * recipes with the given urlParameters.
   * @param {Array} urlParam - an array filled with arrays of url parameters, ex.[parameter, value]
   * @return {Array} Array of recipes
   */
  async searchByName(urlParam) {
    // get all recipes
    const recipes = await this.getRecipes();

    // split input query into array of words
    let query = urlParam[0][1];
    const words = query.toLowerCase().split(" ");

    // initialize extra search filters to default parameters
    let categories = [];
    let costMin = 0;
    let costMax = Number.MAX_VALUE;
    let compareFunction = null;   

    // loop through extra search parameters and set filter vars
    for (const param of urlParam) {
      const paramName = param[0];
      if (paramName == "costmin") {
        costMin = param[1];
      } else if (paramName == "costmax") {
        costMax = param[1];
      } else if (paramName == "sortTime") {
        if (param[1] == "asc") {
          compareFunction = function (a, b) {
            // get a time
            const aTime = a.recipe.info.readyInMinutes;
            // get b time
            const bTime = b.recipe.info.readyInMinutes;
            // sort a before b
            if (aTime > bTime) {
              return 1;
            }
            // sort b before a
            else if (bTime > aTime) {
              return -1;
            }
            // keep original order
            return 0;
          };
        } else if (param[1] == "desc") {
          compareFunction = function (a, b) {
            // get a time
            const aTime = a.recipe.info.readyInMinutes;
            // get b time
            const bTime = b.recipe.info.readyInMinutes;
            // sort a before b
            if (aTime > bTime) {
              return -1;
            }
            // sort b before a
            else if (bTime > aTime) {
              return 1;
            }
            // keep original order
            return 0;
          };
        }        
      } else if (paramName == "sortcost") {
        if (param[1] == "desc") {
          compareFunction = function (a, b) {
            // get a total cost
            let aTotalCost =
              a.recipe.info.pricePerServings * a.recipe.nutrients.totalServings;
            // get b total cost
            let bTotalCost =
              b.recipe.info.pricePerServings * b.recipe.nutrients.totalServings;
            // sort a before b
            if (aTotalCost > bTotalCost) {
              return -1;
            }
            // sort b before a
            else if (bTotalCost > aTotalCost) {
              return 1;
            }
            // keep original order
            else {
              return 0;
            }
          };
        } else if (param[1] == "asc") {
          compareFunction = function (a, b) {
            // get a total cost
            let aTotalCost =
              a.recipe.info.pricePerServings * a.recipe.nutrients.totalServings;
            // get b total cost
            let bTotalCost =
              b.recipe.info.pricePerServings * b.recipe.nutrients.totalServings;
            // sort b before a
            if (aTotalCost > bTotalCost) {
              return 1;
            } else if (bTotalCost > aTotalCost) {
              return -1;
            } else {
              return 0;
            }
          };
        }
      } 
      else if (paramName == "glutenFree" ||
                paramName == "health" ||
                paramName == "highProtein" ||
                paramName == "vegan" ||
                paramName == "vegetarian") {
        categories.push(paramName);
      }
    }

    // initialize matrix of matching recipes:
    // M[i, j] = jth recipe which matches i categories
    let matchingRecipes = [];
    for (let i = 0; i <= categories.length; ++i) {
      const categoryGroup = [];
      matchingRecipes.push(categoryGroup);
    }

    // The following two functions are helpers for the succeeding loop

    /**
     * Checks to see if any user defined words are in the title of a recipe
     * @param {Array} words - Words array made by user input
     * @param {number} index - Recipe index
     * @returns {boolean} - Whether any of the words in array words is in the title of a recipe
     */
     function matchingWords(words, index) {
      return words.some((w) =>
        recipes[index].metadata.title.toLowerCase().includes(w)
      );
    }

    /**
     * 
     * @param {Array} selectedCats - Array of categories from user input 
     * @param {Object} recipeCats - Object with parameters of categories in a recipe
     * @returns {number} - Number of matches between user categories and recipe categories
     */
    function countMatches(selectedCats, recipeCats) {
      let count = 0;
      for (let e of selectedCats) {
        if (recipeCats[e] === true) {
          ++count;
        }
      }
      return count;
    }

    // loop through all recipes, add any for which the title inclues at least
    // one of the input words to the output and is within price parameters
    for (let i = 0; i < recipes.length; ++i) {
      if (
        recipes[i] !== null &&
        typeof recipes[i] !== "undefined" &&
        Object.prototype.hasOwnProperty.call(recipes[i], "metadata") &&
        Object.prototype.hasOwnProperty.call(recipes[i].metadata, "title") &&
        recipes[i].info.pricePerServings *
        recipes[i].nutrients.totalServings >= costMin &&
        recipes[i].info.pricePerServings *
        recipes[i].nutrients.totalServings <= costMax &&
        matchingWords(words, i)
      ) {
        const count = countMatches(categories, recipes[i].categories);
        matchingRecipes[count].push({ index: i, recipe: recipes[i] });
      }
    }

    // concatenate rows of matchingRecipes into single array
    // in order of most matches
    let output = [];
    for (let i = matchingRecipes.length - 1; i > 0; --i) {
      output = output.concat(matchingRecipes[i]);
    }

    // sort if a sorting function was chosen
    if (compareFunction !== null) {
      output.sort(compareFunction);
    }
    
    return output;
  }
}
