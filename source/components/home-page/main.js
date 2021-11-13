window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next-button-1").addEventListener("click", () => {
    let recipecardgrid = document.getElementById("recipe-card-grid-1");
    recipecardgrid.scroll({
      left: recipecardgrid.clientWidth + recipecardgrid.scrollLeft,
      behavior: "smooth",
    });
  });
});
