import './sass/main.scss';
import Notiflix from 'notiflix';
import picAPIService from './js/photoAPI'
var debounce = require('lodash.debounce');

const INFO_MSG = 'Search is empty. Please enter something';
const WARNING_MSG = 'No more pictures left! :(';
const FAILURE_MSG ='Sorry, there are no images matching your search query. Please try again.';

const refs = {
    searchForm: document.querySelector('#search-form'),
    articlesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

const picsAPI = new picAPIService();
refs.loadMoreBtn.style.display = "none";
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', debounce(()=>loadContent('loadmoreBtn'),300));


async function onSearch (e){

    e.preventDefault();
    let insertedData = e.currentTarget.elements.searchQuery.value
    if (!insertedData){
      Notiflix.Notify.info(INFO_MSG);
      return
    }
    picsAPI.query = insertedData;
    picsAPI.resetPage();
    refs.articlesContainer.innerHTML = '';
    loadContent('search');
    refs.loadMoreBtn.removeAttribute("style");
}

async function loadContent(payload = ''){
  console.log('payload: ', payload);
   try {
    const data = await picsAPI.fetchArticles();
    if (data.length === 0){
      const {mes, method} = payload === 'search'? {mes:FAILURE_MSG, method:"failure"} : {mes:WARNING_MSG, method:"warning"};
      Notiflix.Notify[method](mes);
      return
    }

    const data2 = await generateMarkup(data);
    await insertMarkupLast(data2);
   } catch (error) {
     console.log('error: ', error);
     
   }


}

function generateMarkup(elem = []) {
    return elem.map(({webformatURL,tags,likes,views,comments, downloads}) => {
    return `<div class="photo-card">
<img src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes: ${likes}</b>
  </p>
  <p class="info-item">
    <b>Vievs: ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments: ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: ${downloads}</b>
  </p>
</div>
</div>`}).join('');

    }

    function insertMarkupLast(data = ''){
        refs.articlesContainer.insertAdjacentHTML('beforeend', data);
    }

    function doCheking(){
      let x = e.target;
      console.log(' x: ',  x);

    }











// async function aTest(){
//         try {
//             const a = await fetch(`https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=cat&image_type=photo&page=1&per_page=3&orientation=horizontal&safesearch=true`)
//             console.log('a: ', a);
//             const b = await a.json();
//             console.log('b: ', b);
//             await test(b.hits);
//         } catch (error) {
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//         }
//     };

//   console.log(aTest());  
//   function test(data){
//       console.log('data: ', data);

//   }    
