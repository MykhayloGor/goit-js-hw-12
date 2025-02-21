import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { imagesTemplate } from './js/render-functions.js';
import { fetchImages } from './js/pixabay-api.js';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const params = {
  query: null,
  page: 1,
  perPage: 40,
};

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  params.query = e.target.elements['search-query'].value.trim();
  params.page = 1;
  if (!params.query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  hideLoadMoreBtn();
  refs.gallery.innerHTML = '';

  try {
    const images = await fetchImages(params.query, params.page, params.perPage);
    params.total = images.totalHits;
    if (!images || images.length === 0) {
      showError('Sorry, no images found. Try again!');
      return;
    }

    refs.gallery.innerHTML = imagesTemplate(images);
    lightbox.refresh();
    showLoadMoreBtn();
  } catch (error) {
    showError('An error occurred while fetching images. Check console.');
  } finally {
    hideLoader();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  showLoader();
  params.page += 1;

  try {
    const images = await fetchImages(params.query, params.page, params.perPage);

    if (!images || images.length === 0) {
      hideLoadMoreBtn();
      showInfo("We're sorry, but you've reached the end of search results.");
      return;
    }

    refs.gallery.insertAdjacentHTML('beforeend', imagesTemplate(images));
    lightbox.refresh();
    scrollPage();
    const totalPages = Math.ceil(params.total / params.perPage);
    if (params.page >= totalPages) {
      hideLoadMoreBtn();
      showInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    showError('An error occurred while fetching images.');
  } finally {
    hideLoader();
  }
});

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  setTimeout(() => {
    refs.loader.classList.add('hidden');
  }, 200);
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}

function showInfo(message) {
  iziToast.info({
    title: 'Message',
    message,
    position: 'topRight',
  });
}

function scrollPage() {
  const cardHeight =
    refs.gallery.firstElementChild?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
