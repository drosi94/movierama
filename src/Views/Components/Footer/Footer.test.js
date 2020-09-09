import { Footer } from '.';
import { TestUtils } from '../../../Utils/';
import template from './template.html';

let customComponent = null;

describe('Footer', () => {
  beforeAll(() => {
    customComponent = new Footer(template);
  });

  it('should create new instance of Footer', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render('movierama-footer');
    const hasHead = shadowRoot.innerHTML.includes('head');
    const hasFooter = shadowRoot.innerHTML.includes('footer');

    expect(hasHead).toBe(true);
    expect(hasFooter).toBe(true);
  });
});
