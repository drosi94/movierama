import { Header } from '.';
import template from './template.html';
import { TestUtils } from '../../../Utils/TestUtilities';

let customComponent = null;

describe('Header', () => {
  beforeAll(() => {
    customComponent = new Header(template);
  });

  it('should create new instance of Header', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowRoot } = await TestUtils.render('movierama-header');
    const hasHead = shadowRoot.innerHTML.includes('<head>');
    const hasH1 = shadowRoot.innerHTML.includes('<h1>');
    const hasP = shadowRoot.innerHTML.includes('<p>');

    expect(hasHead).toBe(true);
    expect(hasH1).toBe(true);
    expect(hasP).toBe(true);
  });
});
