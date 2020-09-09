// Credits to https://medium.com/@pietmichal/how-to-test-a-web-component-b5d64d5e8bb0

export class TestUtils {
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   * @param {string} tag
   * @param {object} attributes
   * @returns {Promise<HTMLElement>}
   */
  static async render(tag, attributes = {}) {
    TestUtils._renderToDocument(tag, attributes);
    await customElements.whenDefined(tag);
    await TestUtils.nextFrame();
    return document.querySelector(tag);
  }

  /**
   * Resolves after requestAnimationFrame.
   * @returns {Promise<void>} Promise that resolved after requestAnimationFrame
   */
  static nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   * @param {string} tag
   * @param {object} attributes
   */
  static _renderToDocument(tag, attributes) {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(attributes);
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`;
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   *
   * @param {object} attributes
   * @returns {string}
   */
  static _mapObjectToHTMLAttributes(attributes) {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}="${current[1]}"`;
    }, '');
  }
}
