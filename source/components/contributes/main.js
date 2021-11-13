/* global FilePond */
/* global FilePondPluginImagePreview */

window.addEventListener("DOMContentLoaded", () => {
  // add filepond
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.parse(document.body);

  // add and delete ingredients
  let ingredientbox = document.getElementById(
    "ingredients-input-grid"
  ).children;
  let i1 = ingredientbox[2];
  let i2 = ingredientbox[4];
  let i3 = ingredientbox[6];
  ingredientbox[0].addEventListener("click", () => {
    addIngredients();
  });
  ingredientbox[2].addEventListener("click", () => {
    deleteIngredient(i1);
  });
  ingredientbox[2].previousSibling.remove();
  ingredientbox[4].addEventListener("click", () => {
    deleteIngredient(i2);
  });
  ingredientbox[4].previousSibling.remove();
  ingredientbox[6].addEventListener("click", () => {
    deleteIngredient(i3);
  });
  ingredientbox[6].previousSibling.remove();

  // add and deltete steps
  let steps = document.getElementById("steps-input-grid").children;
  let s1 = steps[1];
  let s2 = steps[2];
  steps[0].addEventListener("click", () => {
    addSteps();
  });
  steps[1].addEventListener("click", () => {
    s1.remove();
  });
  steps[2].addEventListener("click", () => {
    s2.remove();
  });
});

function addIngredients() {
  let ingredientsinputgrid = document.getElementById("ingredients-input-grid");
  let ingredientindex = 1 + (ingredientsinputgrid.childElementCount - 1) / 2;
  let newingredient = document.createElement("input");
  newingredient.type = "text";
  newingredient.id = "ingredients-" + ingredientindex;
  ingredientsinputgrid.append(newingredient);
  let newbutton = document.createElement("i");
  newbutton.className += "fas fa-minus-circle";
  ingredientsinputgrid.append(newbutton);
  newbutton.addEventListener("click", () => {
    deleteIngredient(newbutton);
  });
}

function deleteIngredient(ingredient) {
  ingredient.previousSibling.remove();
  ingredient.remove();
}

function addSteps() {
  let allstepgrids = document.getElementById("steps-input-grid");
  let indexsteps = allstepgrids.childElementCount;
  let stepgrid = document.createElement("div");
  stepgrid.id = "steps-grid-" + indexsteps;
  let steptext = document.createElement("textarea");
  steptext.id = "steps-" + indexsteps;
  steptext.innerText = "Step " + indexsteps + "...";
  stepgrid.append(steptext);
  let stepfile = document.createElement("input");
  stepfile.type = "file";
  stepfile.name = "filepond";
  stepfile.className += "filepond img-upload";
  stepgrid.append(stepfile);
  let stepdeletebutton = document.createElement("i");
  stepdeletebutton.className += "fas fa-minus-circle";
  stepgrid.append(stepdeletebutton);
  allstepgrids.append(stepgrid);

  FilePond.parse(document.body);
  stepdeletebutton.addEventListener("click", () => {
    stepgrid.remove();
  });
}

function cancelConfirm() {
  confirm("Cancel?");
}

function submitConfirm() {
  confirm("Submit?");
}
