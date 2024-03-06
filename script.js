import{createElement1, selectedElement} from "./domUtils.js";
import { setData, getDataStorage } from "./storage.js";
// --responsive input group search
const searchInput=selectedElement('.input-group input')
const searchInputGroup=selectedElement('.input-group')
console.log(searchInputGroup);
if(window.innerWidth<=320){
    searchInputGroup.classList.add('input-group-sm')
}else{
    searchInputGroup.classList.remove('input-group-sm')

}
window.addEventListener('resize', ()=>{
    if(window.innerWidth<=320){
        searchInputGroup.classList.add('input-group-sm')
    }else{
        searchInputGroup.classList.remove('input-group-sm')
    }
})


//? create cards of movies
//select row
const row=selectedElement('.parentOfCardsMovies .row')


//--------------------------------------
function cards(data){
    const colDiv=createElement1('div', ['col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-3'])
    const cardDiv=createElement1('div', ['card', 'text-bg-dark'])
    const image=createElement1('img', ['card-img'])
    image.setAttribute('src', data.show.image.original)
    const shadowDiv=createElement1('div', ['shadow'])
    const cardImageOverlay=createElement1('div', ['card-img-overlay'])
    cardImageOverlay.id=data.show.id

    //!we should add addEventListener for card image overly
    cardImageOverlay.addEventListener('click', async(e)=>{
        console.log(e.target.id);
        await setData(e.target.id)
        location.replace('./episode.html')
    })
    //!
    const cardDescriptionDiv=createElement1('div', ['cardDescription'])
    const titleCard=createElement1('h5', ['card-title'])
    titleCard.innerText=data.show.name
    const genersText=createElement1('p', ['card-text'])
    data.show.genres.forEach(gener => {
        genersText.innerText+=`${gener}|`
    });
    const ratingText=createElement1('p', ['card-text'])
    ratingText.innerText=data.show.rating.average
    cardDescriptionDiv.append(titleCard)
    cardDescriptionDiv.append(genersText)
    cardDescriptionDiv.append(ratingText)
    cardImageOverlay.append(cardDescriptionDiv)
    cardDiv.append(image)
    cardDiv.append(shadowDiv)
    cardDiv.append(cardImageOverlay)
    colDiv.append(cardDiv)
    row.append(colDiv)
}                
// const testCard=selectedElement('.card-img-overlay')
// testCard.addEventListener('click', (e)=>{
//     console.log(e.target.id);
// })
const nameMovies=['Game of thrones', 'breaking bad', 'dark', 'the nevers', 'sherlock', 'the sopranos', 'planet earth', 'true detective', 'prison break', 'the wire', 'the office', 'friends']
let index=0
const getData=setInterval(async() => {
     const res=await fetch(`https://api.tvmaze.com/search/shows?q=${nameMovies[index]}`)
        const data=await res.json()
        console.log(data[0]);
        cards(data[0])
        console.log(data);
        index++
        if(index===12){
            clearInterval(getData)
        }
}, 2000);

//?live search input
const inputSearch=selectedElement('.inputSearchHome')
inputSearch.addEventListener('input', (e)=>{
 console.log(e.target.value);
 const cardsText=document.querySelectorAll('.card .card-title')
 cardsText.forEach((card)=>{
     console.log(card.innerText);
     if(card.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
        card.parentElement.parentElement.parentElement.parentElement.style.display='block'
     }else{
        card.parentElement.parentElement.parentElement.parentElement.style.display='none'
     }
 })
})