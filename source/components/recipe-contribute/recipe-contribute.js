class RecipeContribute extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set params(params) {
    this.routeParams = params;
  }
  set route(route) {
    this.routeName = route;
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
    console.log("this.routeName:");
    console.log(this.routeName);
    console.log("this.routeParams:");
    console.log(this.routeParams);
  }

  uploadImg(event) {
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + URL.createObjectURL(event.target.files[0]) + ")";
  }
}

customElements.define("recipe-contribute", RecipeContribute);
