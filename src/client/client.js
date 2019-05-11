import axios from 'axios';

const url = 'https://min-api.cryptocompare.com/data';
const api_key = '1d08c0eb6e317944ba583f9511935eb6a84bafa7c33ec208a7eea85201e441c4';

export const fetchCurrentPrices = () => {
    return axios.get(`${url}/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR&APIKEY=${api_key}`);
}

export const fetchCurrencyChart = (currency) => {
    return axios.get(`${url}/histoday?fsym=${currency}&tsym=USD&limit=7`)
}

