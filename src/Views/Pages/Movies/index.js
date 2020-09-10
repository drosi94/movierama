import { CustomComponent } from '../../../Utils/CustomComponent';

import template from './template.html';

export class MoviesPage extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('movierama-movies-page', MoviesPage);
