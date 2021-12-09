export class YummyRecipesComponent extends HTMLElement {
  /**
   * Constructor to set up shadow DOM for the component.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the routeParams instance variable to an array of route parameters.
   * @param {number[]} params - Array of route parameters.
   */
  set params(params) {
    this.routeParams = params;
  }

  /**
   * Sets the routeName instance variable to the route's name.
   * @param {string} route - The route name.
   */
  set route(route) {
    this.routeName = route;
  }

  /**
   * Sets the routeUrlParams instance variable to the route's url parameters.
   * @param {string} route - The url parameters for the route (i.e. {query: "chicken"}).
   */
  set urlParams(urlParams) {
    this.routeUrlParams = urlParams;
  }

  /**
   * Fires when this component is inserted into the DOM.
   *
   * @async
   */
  async connectedCallback() {
    const elementContent = await fetch(this.htmlPath);
    const elementContentText = await elementContent.text();

    this.shadowRoot.innerHTML = elementContentText;
    this.setupElement();
  }

  /**
   * Setup code for this component
   *
   * @async
   */
  async setupElement() {}
}
