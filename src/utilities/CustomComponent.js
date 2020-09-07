export class CustomComponent extends HTMLElement {
  /**
   * Creates a new CustomComponent object to be used as an element in HTML.
   * @param template, The template HTML to be used
   */
  constructor(template) {
    super();
    this.template = template;
    // Create shadowRoot to scoped the styles
    this.shadowDocument = this.attachShadow({ mode: 'open' });
    // Little hack to copy main css anf fontawesome styles into shadow doms.
    const head = document.createElement('head');
    const fontawesomeStyles = document.querySelectorAll(
      'link[rel="stylesheet"]'
    );
    fontawesomeStyles.forEach((fontawesomeStyle) => {
      head.appendChild(fontawesomeStyle.cloneNode());
    });
    if (fontawesomeStyles) {
      this.shadowDocument.appendChild(head);
    }
  }

  /**
   * Invokes when the element is appended into document.
   */
  connectedCallback() {
    // Check if node is connected (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
    if (this.isConnected) {
      const templateElement = document.createElement('template');
      templateElement.innerHTML = this.template;
      this.shadowDocument.appendChild(templateElement.content.cloneNode(true));
    }
  }
}
