import { CustomComponent } from '../../utilities/CustomComponent';

const tagName = 'movierama-footer';
import template from './template.html';

export class Footer extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(tagName, Footer);
