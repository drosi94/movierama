export const objectToQueryParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

export const throttle = (fn, delay) => {
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
};

export const debounce = (fn, delay) => {
  let inDebounce = null;
  return (args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => fn(args), delay);
  };
};
