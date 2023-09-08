import { fetchBreeds, fetchCatByBreed} from "./api";

const select = document.querySelector('.breed-select');
console.log(select);
const info = document.querySelector('.cat-info');
 
fetchBreeds().then(res => {
    console.log(res.data);
     const options = res.data;
     const markup = options.map((item) =>
         `<option value="${item.id}">${item.name}</option>`)
         .join("");
     select.insertAdjacentHTML("beforeend", markup);

});
select.addEventListener('change', () => {

    const id = select.options[select.selectedIndex].value;
    fetchCatByBreed(id).then(res => {
        console.log(res.data);
        const infoMarkup =
            `<img src="${res.data[0].url}">
        <p>${res.data[0].breeds[0].description}</p>
        <p>${res.data[0].breeds[0].temperament}</p>`;
        info.insertAdjacentHTML("afterend", infoMarkup);
    });
   
});
    
