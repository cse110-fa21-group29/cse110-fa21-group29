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
