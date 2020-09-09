import { CustomComponent } from '../../utilities/CustomComponent';

const tagName = 'movierama-header';
import template from './template.html';

export class Header extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(tagName, Header);
