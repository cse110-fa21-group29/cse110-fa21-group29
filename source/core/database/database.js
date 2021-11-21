import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

// Database credential file
const configFile = "../../../config.json";

export class Database {
  /**
  /**
   * Fetches all recipe objects from database
   *
   * @return array of recipe objects
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
   * Pushes recipe object to database in the next index
   *
   * @param recipe an object that contains the recipe data
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
  }

  /**
   * Replaces recipe data at index with object specified in the parameter
   *
   * @param recipe an object that contains the recipe data
   * @param index  the int index of the recipe to replace
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
}
