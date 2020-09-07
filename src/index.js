require('dotenv').config();

require('./components/App');
require('./components/Header');
require('./components/MovieList');
require('./components/MovieList/MovieItem');
require('./components/MovieList/MovieItem/MovieTrailer');
require('./components/MovieList/MovieItem/MovieReviewList');
require('./components/MovieList/MovieItem/MovieReviewList/MovieReviewItem');
require('./components/MovieList/MovieItem/MovieSimilarList');
require('./components/MovieList/MovieItem/MovieSimilarList/MovieSimilarItem');
require('./components/Footer');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
