class CommonFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    let elementContent = await fetch('components/common/footer/common-footer.html');
    let elementContentText = await elementContent.text();
    this.shadowRoot.innerHTML = elementContentText;
  }
}

customElements.define('common-footer', CommonFooter);