class RecipeCard extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('recipe-card');
    console.log(template);
    let templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: 'open' })
      .appendChild(templateContent.cloneNode(true));
  }

  set data(data) {
    console.log(data);
    this.shadowRoot.querySelector('.recipe-card-text').innerHTML = data;
  }
}

customElements.define('recipe-card', RecipeCard);