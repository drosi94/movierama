import { CustomComponent } from '../../../Utils/CustomComponent';

const tagName = 'movierama-footer';
import template from './template.html';
import css from '!!raw-loader!postcss-loader!./styles.css'; 

export class Footer extends CustomComponent {
  constructor() {
    super(template, css);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define(tagName, Footer);
