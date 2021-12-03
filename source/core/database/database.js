import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
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

    let phrase = urlParam[0][1];

    // split input phrase into array of words
    const words = phrase.toLowerCase().split(" ");

    let matchingRecipes = [];

    // loop through all recipes, add any for which the title inclues one of the input words to the output
    for (let i = 0; i < recipes.length; ++i) {
      if (
        recipes[i] !== null &&
        typeof recipes[i] !== "undefined" &&
        Object.prototype.hasOwnProperty.call(recipes[i], "metadata") &&
        Object.prototype.hasOwnProperty.call(recipes[i].metadata, "title") &&
        words.some((w) => recipes[i].metadata.title.toLowerCase().includes(w))
      ) {
        matchingRecipes.push({ index: i, recipe: recipes[i] });
      }
    }

    // contains all categories in url
    let categories = [];

    // loop through all parameters to get all categories
    for (const param of urlParam) {
      let specificParam = param[0];
      // if currParam is glutenFree
      if (specificParam == "glutenFree") {
        categories.push(specificParam);
      }
      // if currParam is healthy
      if (specificParam == "healthy") {
        categories.push(specificParam);
      }
      // if currParam is highProtein
      if (specificParam == "highProtein") {
        categories.push(specificParam);
      }
      // if currParam is vegan
      if (specificParam == "vegan") {
        categories.push(specificParam);
      }
      // if currParam is vegetarian
      if (specificParam == "vegetarian") {
        categories.push(specificParam);
      }
    }

    // holds objects that contain categoryCount and the recipe with it
    let recipePriority = [];

    // loop through all parameters
    for (const param of urlParam) {
      // parameter type
      let specificParam = param[0];

      // parameter value
      let paramValue = param[1];

      // handles the case if there is costmin
      if (specificParam == "costmin") {
        let updateRecipe = [];
        for (const recipe of matchingRecipes) {
          // Price per servings * total servings = total cost
          let totalCost =
            recipe.recipe.info.pricePerServings *
            recipe.recipe.nutrients.totalServings;
          // if totalCost is greater than minCost
          if (totalCost > paramValue) {
            updateRecipe.push(recipe);
          }
        }
        // set matchingRecipes to newly sorted updateRecipe
        matchingRecipes = updateRecipe;
      }

      // handles the case if there is costmax
      if (specificParam == "costmax") {
        let updateRecipe = [];
        for (const recipe of matchingRecipes) {
          // Price per servings * total servings = total cost
          let totalCost =
            recipe.recipe.info.pricePerServings *
            recipe.recipe.nutrients.totalServings;
          // if totalCost is greater than minCost
          if (totalCost < paramValue) {
            updateRecipe.push(recipe);
          }
        }
        // set matchingRecipes to newly sorted updateRecipe
        matchingRecipes = updateRecipe;
      }
    }

    // handles the case if there is at least 1 category
    if (categories.length > 0) {
      // loop through entire matchingRecipes
      for (const recipe of matchingRecipes) {
        let categoryCount = 0;
        // loop through all categories
        for (const category of categories) {
          // if current recipe has category as true
          if (recipe.recipe.categories[category]) {
            // increment categoryCount for specific recicpe
            categoryCount++;
          }
        }
        // push an object with the categoryCount and recipe
        recipePriority.push({
          categoryCount: categoryCount,
          recipe: recipe,
        });
      }
    }

    // sort recipePriority by category count from highest to lowest
    recipePriority.sort(function (a, b) {
      if (a.categoryCount > b.categoryCount) {
        return -1;
      } else if (b.categoryCount > a.categoryCount) {
        return 1;
      } else {
        return 0;
      }
    });

    // hold the recipes that have the requested category/categories
    let updateRecipe = [];
    for (const recipe of recipePriority) {
      if (recipe.categoryCount > 0) {
        updateRecipe.push(recipe.recipe);
      }
    }
    matchingRecipes = updateRecipe;

    // loop through all parameters
    for (const param of urlParam) {
      // parameter type
      let specificParam = param[0];

      // parameter value
      let paramValue = param[1];

      // handles the case if there is sorttime
      if (specificParam == "sorttime") {
        // handles the case if descending by time
        if (paramValue == "desc") {
          matchingRecipes.sort(function (a, b) {
            // get a time
            let aTime = a.recipe.info.readyInMinutes;
            // get b time
            let bTime = b.recipe.info.readyInMinutes;
            // sort a before b
            if (aTime > bTime) {
              return -1;
            }
            // sort b before a
            else if (bTime > aTime) {
              return 1;
            }
            // keep original order
            else {
              return 0;
            }
          });
        }
        // handles the case if ascending by time
        if (paramValue == "asc") {
          matchingRecipes.sort(function (a, b) {
            // get a time
            let aTime = a.recipe.info.readyInMinutes;
            // get b time
            let bTime = b.recipe.info.readyInMinutes;
            // sort b before a
            if (aTime > bTime) {
              return 1;
            }
            // sort a before b
            else if (bTime > aTime) {
              return -1;
            }
            // keep original order
            else {
              return 0;
            }
          });
        }
      }

      // handles the case if there is sortcost
      if (specificParam == "sortcost") {
        // handles the case if descending by cost
        if (paramValue == "desc") {
          matchingRecipes.sort(function (a, b) {
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
          });
        }
        // handles the case if ascending by cost
        if (paramValue == "asc") {
          matchingRecipes.sort(function (a, b) {
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
          });
        }
      }
    }
    return matchingRecipes;
  }
}
