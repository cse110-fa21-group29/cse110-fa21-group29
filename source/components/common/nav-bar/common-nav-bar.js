class CommonNavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/common/nav-bar/common-nav-bar.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
  }
}

customElements.define("common-nav-bar", CommonNavBar);
