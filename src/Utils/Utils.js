export class Utils {
  static objectToQueryParams(params) {
    return Object.keys(params)
      .map((key) => key + '=' + params[key])
      .join('&');
  }

  static throttle(fn, delay) {
    let inThrottle = false;
    return (args) => {
      if (inThrottle) {
        return;
      }
      inThrottle = true;
      fn(args);
      setTimeout(() => {
        inThrottle = false;
      }, delay);
    };
  }

  static debounce(fn, delay) {
    let inDebounce = null;
    return (args) => {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => fn(args), delay);
    };
  }
}
