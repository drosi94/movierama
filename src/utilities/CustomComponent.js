export class CustomComponent extends HTMLElement {
  /**
   * Creates a new CustomComponent object to be used as an element in HTML.
   * @param template, The template HTML to be used
   */
  constructor(template) {
    super();
    this._template = template;

    // Create shadowRoot to scope the styles
    this.attachShadow({ mode: 'open' });

    // Little hack to copy stylesheets into shadow doms.
    const head = document.createElement('head');
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach((stylesheet) => {
      head.appendChild(stylesheet.cloneNode());
    });
    if (stylesheets) {
      this.shadowRoot.appendChild(head);
    }
  }

  /**
   * Invokes when the element is appended into document.
   */
  connectedCallback() {
    // Check if node is connected (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
    if (this.isConnected) {
      const templateElement = document.createElement('template');
      templateElement.innerHTML = this._template ? this._template : '';
      this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
    }
  }
}

customElements.define('custom-component', CustomComponent);
