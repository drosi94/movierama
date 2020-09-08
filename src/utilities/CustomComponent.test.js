import { CustomComponent } from './CustomComponent';
import { TestUtils } from './TestUtilities';

let customComponent = null;
describe('CustomComponent', () => {
  beforeAll(() => {
    customComponent = new CustomComponent(`<p>Hello World</p>`);
  });

  it('should create new instance of CustomComponent', () => {
    expect(customComponent).not.toBeNull();
  });

  it('should render the template', async () => {
    const { shadowDocument } = await TestUtils.render('custom-component');
    const hasHead = shadowDocument.innerHTML.includes(`<head>`);

    expect(hasHead).toBe(true);
  });
});
