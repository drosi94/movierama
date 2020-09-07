import { CustomComponent } from '../../utilities/CustomComponent';

const tagName = 'movierama-footer';
import template from './template.html';

class Footer extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(tagName, Footer);
