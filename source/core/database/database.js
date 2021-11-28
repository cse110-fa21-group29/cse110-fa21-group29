import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { collection, getDocs, limit, query, where } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
import {
  child,
  get,
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

// Database credential file
const configFile = "../../../config.json";

/** Class that interfaces with the Firebase realtime database. */
export class Database {
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
   * any words in the input string match.
   * @param {string} phrase - group of words to match in search
   * @return {Array} Array of recipes
   */
  async searchByName(phrase) {
    // get all recipes
    const recipes = await this.getRecipes();

    // split input phrase into array of words
    const words = phrase.toLowerCase().split(' ');

    const matchingRecipes = [];

    // loop through all recipes, add any for which the title inclues one of the input words to the output
    for (let i = 0; i < recipes.length; ++i) {
      if (recipes[i] !== null
          && typeof(recipes[i]) !== 'undefined'
          && Object.prototype.hasOwnProperty.call(recipes[i], 'metadata')
          && Object.prototype.hasOwnProperty.call(recipes[i].metadata, 'title')
          && words.some(w => recipes[i].metadata.title.toLowerCase().includes(w))) {
        matchingRecipes.push(recipes[i]);
      }
    }

    return matchingRecipes;
  }

}
