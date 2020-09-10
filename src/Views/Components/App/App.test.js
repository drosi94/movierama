import { App } from '.';
import { TestUtils } from '../../../Utils/TestUtilities';
import template from './template.html';

let customComponent = null;

describe('App', () => {
  beforeAll(() => {
    customComponent = new App(template);
  });

  it('should create new instance of App', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render('movierama-app');
    const hasMoviesPage = shadowRoot.innerHTML.includes(
      'movierama-movies-page'
    );

    expect(hasMoviesPage).toBe(true);
  });
});
