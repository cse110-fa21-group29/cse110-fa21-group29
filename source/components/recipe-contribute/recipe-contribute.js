import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

let response = await fetch("../../config.json");
response = await response.json();

const app = initializeApp(response.firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(getDatabase());

let data = undefined;
await get(child(dbRef, `recipes`)).then((snapshot) => {
  if (snapshot.exists()) {
    data = snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

function writeUserData(object) {
  set(ref(database, "recipes/" + data.length), object);
}

class RecipeContribute extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/recipe-contribute/recipe-contribute.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    const customRecipe = {
      "categories": {
        "vegan": false,
        "vegetarian": false,
        "glutenFree": false
      },
      "description": "",
      "info": {
        "readyInMinutes": 0,
        "pricePerServings": 0,
        "weightWatcherSmartPoints": 0,
        "healthScore": 0
      },
      "ingredients": [],
      "metadata": {
        "id": 0,
        "title": "",
        "author": "",
        "image": ""
      },
    "nutrients": {
        "totalServings": 0,
        "calories": "0",
        "protein": "0g",
        "fat": "0g"
    },
    "spoonacularSourceUrl": "",
    "steps": "<ol>",
    };

    this.shadowRoot.querySelector("#submit-button").addEventListener("click", () => {
      // Nutrients
      customRecipe.nutrients.totalServings = this.shadowRoot.querySelector("#input-number-of-servings").value;
      customRecipe.nutrients.calories = this.shadowRoot.querySelector("#input-colories").value;
      customRecipe.nutrients.protein = this.shadowRoot.querySelector("#input-protein").value;
      customRecipe.nutrients.fat = this.shadowRoot.querySelector("#input-fat").value;

      // Categories
      customRecipe.categories.vegan = this.shadowRoot.querySelector("#input-vegan").checked;
      customRecipe.categories.vegetarian = this.shadowRoot.querySelector("#input-vegetarian").checked;
      customRecipe.categories.glutenFree = this.shadowRoot.querySelector("#input-gluten-free").checked;
      
      // Recipe General Information
      customRecipe.metadata.title = this.shadowRoot.querySelector("#input-recipe-title").value;
      customRecipe.metadata.author = this.shadowRoot.querySelector("#input-author").value;
      customRecipe.metadata.readyInMinutes = this.shadowRoot.querySelector("#input-time").value;
      customRecipe.metadata.pricePerServings = this.shadowRoot.querySelector("#input-cost").value;

      // Description
      customRecipe.description = this.shadowRoot.querySelector("#input-description").value;

      // Ingredients
      const ingredients = this.shadowRoot.querySelector("#input-ingredient").value.split('\n');
      customRecipe.ingredients = ingredients;

      // Directions
      const steps = this.shadowRoot.querySelector('#input-direction').value.split('\n');

      for (let i = 0; i < steps.length; i++) {
        customRecipe.steps = customRecipe.steps + "<li>" + steps[i] + "</li>";
      }

      customRecipe.steps = customRecipe.steps + "</ol>";

      // Generate recipe ID for use in routing
      customRecipe.metadata.id = data.length;

      writeUserData(customRecipe);
    });
  }

  uploadImg(event) {
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }
}

customElements.define("recipe-contribute", RecipeContribute);
