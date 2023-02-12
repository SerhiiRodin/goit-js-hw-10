import './css/styles.css';
import Notiflix from 'notiflix';
import _ from 'lodash';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

console.log(
  Notiflix.Notify.failure('Oops, there is no country with that name')
);
console.log(
  Notiflix.Notify.success(
    'Too many matches found. Please enter a more specific name.'
  )
);

inputEl.addEventListener('input', _.debounce(onInputChenge, DEBOUNCE_DELAY));

function onInputChenge(event) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';

  if (!event.target.value.trim()) {
    return;
  }

  const inputText = event.target.value.trim();
  console.dir(inputText);

  fetchCountries(inputText)
    .then(data => {
      console.log(data.length);
      if (data.length > 10) {
        Notiflix.Notify.success(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length > 1) {
        countryListEl.innerHTML = listMarkup(data);
      }
      if (data.length === 1) {
        countryInfoEl.innerHTML = cardMarkup(data);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function cardMarkup(data) {
  return data
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class="wraper">
      <img src="${flags.svg}" alt="${name.official}" />
      <h2 class="country-info_titel">${name.official}</h2>
    </div>
    <div class="cantry-card">
      <p><span class="country-card__info-title">Capital: </span>${capital}</p>
      <p><span class="country-card__info-title">Population: </span>${population}</p>
      <p><span class="country-card__info-title">Languages: </span>${Object.values(
        languages
      ).join(', ')}</p>
    </div>`;
    })
    .join('');
}

function listMarkup(data) {
  return data
    .map(({ flags, name }) => {
      return `<li class="country-list-item">
        <img src="${flags.svg}" alt="${name.official}">
        <h2 class="country-name">${name.official}</h2>
      </li>`;
    })
    .join('');
}
