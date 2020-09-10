import { CustomComponent } from '../../../Utils';

const tagName = 'movierama-header';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 

export class Header extends CustomComponent {
  constructor() {
    super(template, css);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(tagName, Header);
