// Start
window.addEventListener("DOMContentLoaded", () => {
  const recipeCardContainer = document.querySelector(
    ".recipe-card-grid-container"
  );
  for (let i = 0; i < 3; i++) {
    const recipeCard = document.createElement("recipe-card");
    recipeCard.data = "test data " + i;
    recipeCardContainer.appendChild(recipeCard);
  }
  sdfoisndfosidnfoin

  const newRecipe = {
    id: 1,
    title: "My new recipe",
    ingredients: ["ingredient 1", "ingredient 2"],
    steps: ["do something", "do something else", "almost burn yourself"],
  };

  const jsonRecipe = JSON.stringify(newRecipe);
  window.localStorage.setItem("recipe-1", jsonRecipe);

  console.log(window.localStorage.getItem("recipe-1"));
});
