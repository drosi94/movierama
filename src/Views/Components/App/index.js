import { CustomComponent } from '../../../Utils/CustomComponent';

import template from './template.html';

export class App extends CustomComponent {
  constructor() {
    super(template);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

customElements.define('movierama-app', App);
