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
  totalHits: 0,
};

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  params.query = e.target.elements['search-query'].value.trim();
  params.page = 1;
  if (!params.query) {
    console.warn('⚠️ Empty search query');

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
    const data = await fetchImages(params.query, params.page, params.perPage);
    params.total = data.totalHits;
    if (!data.hits || data.hits.length === 0) {
      showError('Sorry, no images found. Try again!');
      return;
    }

    refs.gallery.innerHTML = imagesTemplate(data.hits);
    lightbox.refresh();
    if (shouldShowLoadMore(data.totalHits, params.page, params.perPage)) {
      showLoadMoreBtn();
    } else {
      showInfo("We're sorry, but you've reached the end of search results.");
    }
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
    const data = await fetchImages(params.query, params.page, params.perPage);

    if (!data.hits || data.hits.length === 0) {
      hideLoadMoreBtn();
      showInfo("We're sorry, but you've reached the end of search results.");
      return;
    }

    refs.gallery.insertAdjacentHTML('beforeend', imagesTemplate(data.hits));
    lightbox.refresh();
    scrollPage();
    if (!shouldShowLoadMore(params.total, params.page, params.perPage)) {
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
  refs.loader.classList.add('hidden');
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

function shouldShowLoadMore(totalHits, page, perPage) {
  const totalPages = Math.ceil(totalHits / perPage);
  return page < totalPages;
}
