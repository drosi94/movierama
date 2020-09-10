import { MoviesPage } from '.';
import { TestUtils } from '../../../Utils/TestUtilities';
import template from './template.html';

let customComponent = null;

describe('Movies', () => {
  beforeAll(() => {
    customComponent = new MoviesPage(template);
  });

  it('should create new instance of Movies', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render('movierama-movies-page');
    const hasHead = shadowRoot.innerHTML.includes('head');
    const hasHeader = shadowRoot.innerHTML.includes('movierama-header');
    const hasMain = shadowRoot.innerHTML.includes('main');
    const hasMovieList = shadowRoot.innerHTML.includes('movierama-movie-list');
    const hasFooter = shadowRoot.innerHTML.includes('movierama-footer');

    expect(hasHead).toBe(true);
    expect(hasHeader).toBe(true);
    expect(hasMain).toBe(true);
    expect(hasMovieList).toBe(true);
    expect(hasFooter).toBe(true);
  });
});
