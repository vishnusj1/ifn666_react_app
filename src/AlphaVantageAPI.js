import axios from 'axios';

const API_KEY = 'T3H0OF5ZXYZAWJWA';

export const fetchStockData = (symbol) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;
  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};