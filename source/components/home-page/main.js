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
});

function recipeScroll(scrollleft, recipegrid) {
  if (scrollleft) {
    recipegrid.scroll({
      left: recipegrid.scrollLeft - recipegrid.clientWidth,
      behavior: "smooth",
    });
  } else {
    recipegrid.scroll({
      left: recipegrid.scrollLeft + recipegrid.clientWidth,
      behavior: "smooth",
    });
  }
}
