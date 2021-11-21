import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

export class Database {
  async getRecipes() {
    let response = await fetch("../../../config.json");
    response = await response.json();

    const app = initializeApp(response.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());
    let data = [];

    await get(child(dbRef, `recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          data = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return data;
  }

  async pushRecipe(recipe) {
    let response = await fetch("../../../config.json");
    response = await response.json();

    const app = initializeApp(response.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());
    let data = [];

    await get(child(dbRef, `recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          data = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    recipe.metadata.id = data.length;
    set(ref(database, "recipes/" + data.length), recipe);
  }

  async updateRecipe(recipe, id) {
    let response = await fetch("../../../config.json");
    response = await response.json();

    const app = initializeApp(response.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());
    let data = [];

    await get(child(dbRef, `recipes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          data = snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    for (let i = 0; i < data.length; i++) {
      if (data[i].metadata.id == recipe.metadata.id) {
        set(ref(database, "recipes/" + i), recipe);
        break;
      }
    }
  }
}
