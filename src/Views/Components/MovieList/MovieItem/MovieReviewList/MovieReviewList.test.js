import { MovieReviewList } from '.';
import { TestUtils } from '../../../../../Utils/TestUtilities';
import moviesAPICallerMock from '../../../../../../__mocks__/moviesAPICallerMock';

let customComponent = null;

describe('MovieReviewList', () => {
  beforeAll(() => {
    customComponent = new MovieReviewList();
  });

  it('should create new instance of MovieReviewList', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render(
      'movierama-movie-review-list'
    );
    const container = shadowRoot.querySelector('#movieReviewsContainer');

    expect(container).not.toBeNull();
  });

  it('should render 2 review items', async () => {
    const { shadowRoot } = await TestUtils.render(
      'movierama-movie-review-list',
      { 'data-test': true }
    );
    const container = shadowRoot.querySelector('#movieReviewsContainer');
    setTimeout(() => {
      console.log(container);
      const movieReviewItems = container.querySelectorAll(
        'movierama-movie-review-item'
      );

      expect(movieReviewItems).toBe(2);
    }, 500);
  });
});
