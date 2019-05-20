import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '10567450-40b1156fc7fcc73c8204438b4';
//     ?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

export const fetchedImages = (query, page) => {
  return axios
    .get(
      `?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`,
    )
    .then(
      res =>
        new Promise(resolve =>
          setTimeout(() => {
            resolve(res.data);
          }, 600),
        ),
    );
};

export const eslintGoodBuy = () => null;
