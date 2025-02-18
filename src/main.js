import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderGallery } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentPage = 1;
  currentQuery = form.elements['search-query'].value.trim();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');
  loadMoreButton.classList.add('hidden');

  try {
    const images = await fetchImages(currentQuery, currentPage);

    if (images.length === 0) {
      loader.classList.add('hidden');
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(images);
    lightbox.refresh();

    loadMoreButton.classList.remove('hidden');

    setTimeout(() => {
      loader.classList.add('hidden');
    }, 200);
  } catch (error) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 200);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images',
      position: 'topRight',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  loader.classList.remove('hidden');
  currentPage++;
  try {
    const images = await fetchImages(currentQuery, currentPage);

    if (images.length === 0) {
      loader.classList.add('hidden');
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        title: 'Message',
        message: "We are sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    renderGallery(images, true);
    lightbox.refresh();

    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      loader.classList.add('hidden');
    }, 200);
  } catch (error) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 200);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images',
      position: 'topRight',
    });
  }
});
