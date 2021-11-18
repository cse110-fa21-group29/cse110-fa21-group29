class ComponentName extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    let elementContent = await fetch(
      "components/component-name/component-name.html"
    );
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {}
}

customElements.define("component-name", ComponentName);
