import axios from 'axios';

const API_KEY = '48704705-de0108bea4c192368cade13d3';
const BASE_URL = 'https://pixabay.com/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

let currentPage = 1;

export async function fetchImages(query, page = currentPage, perPage = 40) {
  try {
    const res = await axiosInstance.get('/', {
      params: {
        q: query,
        page,
        per_page: perPage,
      },
    });
      if (res.data.hits.length > 0) { 
        currentPage++;
      }
    return res.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}
