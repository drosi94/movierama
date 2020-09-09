import { CustomComponent } from '../../../utilities';

const tagName = 'movierama-movie-skeleton';
import template from './template.html';

class MovieSkeleton extends CustomComponent {
  constructor() {
    super(template);
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isConnected) {
    }
  }
}

customElements.define(tagName, MovieSkeleton);
