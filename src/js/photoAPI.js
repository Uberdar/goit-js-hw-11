import Notiflix from 'notiflix';
const axios = require('axios');
// console.log('axios: ', axios);
export default class NewAPIQuery {
    constructor(){
        this.searchQueryVar = '';
        this.page = 1;
    }
    async fetchArticles(){
        try {
    const a = await axios.get(`https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${this.searchQueryVar}&image_type=photo&page=${this.page}&per_page=3&orientation=horizontal&safesearch=true`)
    // console.log('a: ', a);
    
    const b = await a.data.hits;
    // console.log('b: ', b);
    this.page += await 1;

    return b;
        } catch (error) {
            console.log(error);
            Notiflix.Notify.failure('error');
        }
    }

    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQueryVar;
    }
    set query(newQuery){
        this.searchQueryVar = newQuery;
    }
}

// return fetch(`https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${this.searchQueryVar}&image_type=photo&page=${this.page}&per_page=3&orientation=horizontal&safesearch=true`)
// .then(elem => elem.json())
// .then(data => {
//     this.page += 1;
//     return data.hits;
// })

// fetchArticles(){
//     return fetch(`https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${this.searchQueryVar}&image_type=photo&page=${this.page}&per_page=3&orientation=horizontal&safesearch=true`)
//     .then(elem => elem.json())
//     .then(data => {
//         this.page += 1;
//         return data.hits;
//     })
//     .catch(err => {Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')});
//     }

// }
// async fetchArticles(){
//     try {
// const a = await fetch(`https://pixabay.com/api/?key=25591290-62741b6a34916fce22a647eec&q=${this.searchQueryVar}&image_type=photo&page=${this.page}&per_page=3&orientation=horizontal&safesearch=true`)
// const b = await a.json();
// const c = await b.hits;
// this.page += await 1;
// return c;
//     } catch (error) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//     }
// }