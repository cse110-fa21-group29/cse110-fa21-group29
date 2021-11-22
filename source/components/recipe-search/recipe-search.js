class RecipeSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/recipe-search/recipe-search.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {
    this.shadowRoot.getElementById("filter-button").addEventListener("click", () => { this.clickFilter() })
    this.shadowRoot.getElementById("search-button").addEventListener("click", () => { this.clickSearch() })
    this.shadowRoot.getElementById("close-button").addEventListener("click", () => { this.clickClose() })
    this.shadowRoot.getElementById("submit-button").addEventListener("click", () => { this.clickSubmit() })
    this.shadowRoot.getElementById("reset-button").addEventListener("click", () => { this.clickReset() })

    
  };

  clickFilter() {
    this.shadowRoot.getElementById("filter-form").style.display = "initial";
  }
  clickSearch() { }
  clickClose() {
    this.shadowRoot.getElementById("filter-form").style.display = "none";
  }
  clickSubmit() { }
  clickReset() { }



}

customElements.define("recipe-search", RecipeSearch);
