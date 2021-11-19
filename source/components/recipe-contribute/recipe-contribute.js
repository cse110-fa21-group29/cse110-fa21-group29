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

const object = {
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

document.getElementById("submit-button").addEventListener("click", () => {
  object.categories.vegan = document.getElementById("input-vegan").checked;
  object.categories.vegetarian = document.getElementById("input-vegetarian").checked;
  object.categories.glutenFree = document.getElementById("input-gluten-free").checked;

  object.description = document.getElementById("input-description").value;

  const ingredients = document.getElementById("input-ingredient").value.split('\n');
  object.ingredients = ingredients;
  
  object.metadata.id = data.length;
  object.metadata.title = document.getElementById("input-recipe-title").value;
  object.metadata.author = document.getElementById("input-author").value;
  object.metadata.image = document.getElementById("submit-img").value;

  object.nutrients.totalServings = document.getElementById("input-number-of-servings").value;
  object.nutrients.calories = document.getElementById("input-colories").value;
  object.nutrients.protein = document.getElementById("input-protein").value;
  object.nutrients.fat = document.getElementById("input-fat").value;

  const steps = document.getElementById('input-direction').value.split('\n');

  for (let i = 0; i < steps.length; i++) {
    object.steps = object.steps + "<li>" + steps[i] + "</li>";
  }
  object.steps = object.steps + "</ol>";

  writeUserData(object);
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

  setupElement() {}

  uploadImg(event) {
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }
}

customElements.define("recipe-contribute", RecipeContribute);
