import axios from 'axios';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    key: '33750532-9281d62f6594077aa9475470d',
  },
});

export const getImages = async (query, page, perPage, skip) => {
  const { data } = await imagesApi.get('/', {
    params: {
      q: query,
      page,
      skip,
      per_page: perPage,
    },
  });

  return data.hits;
};
