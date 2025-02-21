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

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axiosInstance.get('/', {
      params: { q: query, page, per_page: perPage },
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.data.hits;
  } catch (error) {
    return [];
  }
}
