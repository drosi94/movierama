import { MovieReviewItem } from '.';
import template from './template.html';
import { TestUtils } from '../../../../../../Utils/TestUtilities';

let customComponent = null;

describe('MovieReviewItem', () => {
  beforeAll(() => {
    customComponent = new MovieReviewItem(template);
  });

  it('should create new instance of MovieReviewItem', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render(
      'movierama-movie-review-item'
    );
    const container = shadowRoot.querySelector('#movieReviewContainer');

    expect(container).not.toBeNull();
  });

  it('should render a paragraph with the content', async () => {
    const content = 'Test';
    const { shadowRoot } = await TestUtils.render(
      'movierama-movie-review-item',
      {
        'data-content': content,
      }
    );
    const container = shadowRoot.querySelector('#movieReviewContainer');   
    const hasContentParagraph = container.innerHTML.includes(`<p>${content}</p>`);

    expect(hasContentParagraph).toBe(true);
  });
});
