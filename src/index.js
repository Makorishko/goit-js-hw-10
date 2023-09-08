import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');

const error = document.querySelector('.error');

error.style.display = 'none';
select.style.opacity = '0';

fetchBreeds()
  .then(res => {
    select.style.opacity = '1';

    const options = res.data;
    const markup = options
      .map(item => `<option value="${item.id}">${item.name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
      select: '#single',
    });
  })
  .catch(error => {
    Notiflix.Notify.failure(error.message);
  })
  .finally(() => (loader.style.display = 'none'));

select.addEventListener('change', () => {
  loader.style.display = 'flex';
  const id = select.options[select.selectedIndex].value;
  fetchCatByBreed(id)
    .then(res => {
      const infoMarkup = `<div class="container">
    <img src="${res.data[0].url}" width="400px">
    <div class="container-description">
    <h1>${res.data[0].breeds[0].name}</h1>
    <p class="description">${res.data[0].breeds[0].description}</p>
    <h2>Temperament</h2>
    <span class="temperament">${res.data[0].breeds[0].temperament}</span>
    </div></div>`;
      info.innerHTML = infoMarkup;
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    })
    .finally(() => (loader.style.display = 'none'));
});
