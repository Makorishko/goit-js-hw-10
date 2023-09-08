import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './api';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader-wrapper');

const error = document.querySelector('.error');

loader.style.display = 'none';
error.style.display = 'none';

fetchBreeds().then(res => {
  console.log(res.data);

  const options = res.data;
  const markup = options
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
  select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
});

select.addEventListener('change', () => {
  loader.style.display = 'flex';
  const id = select.options[select.selectedIndex].value;
  fetchCatByBreed(id).then(res => {
    loader.style.display = 'none';
    console.log(res.data);
    const infoMarkup = `<div class="container">
    <img src="${res.data[0].url}" width="400px">
    <div class="container-description">
    <h1>${res.data[0].breeds[0].name}</h1>
    <p class="description">${res.data[0].breeds[0].description}</p>
    <h2>Temperament</h2>
    <span class="temperament">${res.data[0].breeds[0].temperament}</span>
    </div></div>`;
    info.insertAdjacentHTML('afterend', infoMarkup);
  });
});
