require('dotenv').config();

import './Views/Components/App';
import './Views/Components/Header';
import './Views/Components/MovieList';
import './Views/Components/MovieList/MovieItem';
import './Views/Components/MovieList/MovieSkeleton';
import './Views/Components/MovieList/MovieItem/MovieTrailer';
import './Views/Components/MovieList/MovieItem/MovieReviewList';
import './Views/Components/MovieList/MovieItem/MovieReviewList/MovieReviewItem';
import './Views/Components/MovieList/MovieItem/MovieSimilarList';
import './Views/Components/MovieList/MovieItem/MovieSimilarList/MovieSimilarItem';
import './Views/Components/Footer';

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
