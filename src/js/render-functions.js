import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export { renderGallery, loader, iziToast, SimpleLightbox };

function renderGallery(images, append = false) {
  const markup = images
    .map(
      img => `
        <li class="gallery-item">  <div class="image-card">  <a class="gallery-link" href="${img.largeImageURL}">
              <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
            </a>
            <div class="gallery-meta">
              <ul class="gallery-stats">
                <li class="stats-item">
                  <span class="stats-label">Likes</span>
                  <span class="stats-value">${img.likes}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Views</span>
                  <span class="stats-value">${img.views}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Comments</span>
                  <span class="stats-value">${img.comments}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Downloads</span>
                  <span class="stats-value">${img.downloads}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      `
    )
    .join('');
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}
