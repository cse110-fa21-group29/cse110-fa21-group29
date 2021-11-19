class AboutUs extends HTMLElement {
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
    let elementContent = await fetch("components/about-us/about-us.html");
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  setupElement() {}
}

customElements.define("about-us", AboutUs);
