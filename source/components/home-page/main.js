// Horizontal Scroll recipes
window.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i < 4; i++) {
    let recippecardgrid = document.getElementById("recipe-card-grid-" + i);
    document
      .getElementById("prev-button-" + i)
      .addEventListener("click", () => {
        recipeScroll(true, recippecardgrid);
      });
    document
      .getElementById("next-button-" + i)
      .addEventListener("click", () => {
        recipeScroll(false, recippecardgrid);
      });
  }

  // copy recipe
  let recipesample = document.getElementById("recipe-card-sample");
  for (let i = 0; i < 20; i++) {
    document
      .getElementById("recipe-card-grid-1")
      .append(recipesample.cloneNode(true));
    document
      .getElementById("recipe-card-grid-2")
      .append(recipesample.cloneNode(true));
    document
      .getElementById("recipe-card-grid-3")
      .append(recipesample.cloneNode(true));
  }
});

function recipeScroll(scrollleft, recipegrid) {
  if (scrollleft) {
    recipegrid.scroll({
      left: recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4,
      behavior: "smooth",
    });
  } else {
    recipegrid.scroll({
      left: recipegrid.scrollLeft + recipegrid.clientWidth,
      behavior: "smooth",
    });
  }
}
