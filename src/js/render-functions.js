import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export { imagesTemplate, loader, iziToast, SimpleLightbox };

function imageTemplate(image) {
  let { webformatURL, largeImageURL, tags, likes, views, comments, downloads } =
    image;

  return `
        <li class="gallery-item">  <div class="image-card">  <a class="gallery-link" href="${image.largeImageURL}">
              <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <div class="gallery-meta">
              <ul class="gallery-stats">
                <li class="stats-item">
                  <span class="stats-label">Likes</span>
                  <span class="stats-value">${image.likes}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Views</span>
                  <span class="stats-value">${image.views}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Comments</span>
                  <span class="stats-value">${image.comments}</span>
                </li>
                <li class="stats-item">
                  <span class="stats-label">Downloads</span>
                  <span class="stats-value">${image.downloads}</span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      `;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
