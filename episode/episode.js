import{createElement1, selectedElement} from "../utils/domUtils.js";
import { setData, getDataStorage } from "../utils/storage.js";
{/* <div class="col-12 col-md-6 col-lg-3 mt-3">
                    <div class="card" >
                        <img src="https://static.tvmaze.com/uploads/images/medium_landscape/478/1195111.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                        <div class="summery"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur minima molestiae voluptatum doloribus velit ratione accusamus provident, quam itaque similique aliquid porro odio hic numquam ipsam illum fugiat optio. Fugiat officia labore quaerat ipsam eaque aspernatur at pariatur iure totam?."
                        </p></div>
                          <h5 class="card-title mt-2">S01-E01 A Study in Pink</h5>
                          <a href="#" class="btn "><i class="fa-solid fa-circle-play fs-1"></i></a>
                        </div>
                      </div>
                </div> */}

//?select row of movies
const rowMovies=selectedElement('.parentOfCardsMovies .container .row')
const selectElem=selectedElement('.form-select')
const searchOption=selectedElement('.inputSelect')
//--
function createCard(array){
    rowMovies.innerHTML=''
    array.forEach((object) => {
        const colDiv=createElement1('div', ['col-12', 'col-md-6', 'col-lg-3', 'mt-3'])
        colDiv.id=object.id
        const cardDiv=createElement1('div', ['card'])
        const image=createElement1('img', ['card-img-top'])
        image.setAttribute('src', object.image.medium)
        const cardBodyDiv=createElement1('div', ['card-body'])
        const summeryDiv=createElement1('div', ['summery'])
        summeryDiv.innerHTML=object.summary
        const titleCard=createElement1('h5', ['card-title', 'mt-2'])
        titleCard.innerText=`S0${object.season}-E${ object.number<10 ? '0'+object.number: object.number} ${object.name}`
        const linkPlay=createElement1('a', ['btn'])
        linkPlay.setAttribute('href', object.url)
        const iconPlay=createElement1('i', ['fa-solid', 'fa-circle-play', 'fs-1'])
        linkPlay.append(iconPlay)
        cardBodyDiv.append(summeryDiv)
        cardBodyDiv.append(titleCard)
        cardBodyDiv.append(linkPlay)
        cardDiv.append(image)
        cardDiv.append(cardBodyDiv)
        colDiv.append(cardDiv)
        rowMovies.append(colDiv)
        //--create option for select
        const optionTag=createElement1('option', [])
        optionTag.value=object.id
        optionTag.innerText=`S0${object.season}-E${ object.number<10 ? '0'+object.number: object.number} ${object.name}`
        selectElem.append(optionTag)
    });
}
async function getDataEpisodes(){
    const ID=await getDataStorage('id')
    const res=await fetch(`https://api.tvmaze.com/shows/${ID}/episodes`)
    const data=await res.json()
    console.log(data);
    createCard(data)
}
getDataEpisodes()


selectElem.addEventListener('change', (e)=>{
    const cards=document.querySelectorAll('.col-12')
    console.log(e.target.value);
    if(e.target.value==='allEpisodes'){
        cards.forEach((card)=>{
            card.classList.remove('none')
        })
    }else if(e.target.value==='inputValue'){
    searchOption.classList.remove('none')
    searchOption.addEventListener('input', (e)=>{
        const cardsResult=document.querySelectorAll('.card-title')
        cardsResult.forEach((title)=>{
            console.log(title.innerText);
            if(title.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
                if(title.parentElement.parentElement.parentElement.classList.contains('none')){
                    title.parentElement.parentElement.parentElement.classList.remove('none')
                }else{
                }
            }else{
                title.parentElement.parentElement.parentElement.classList.add('none')
            }
        })
    })
     console.log('in input search episode');
    }else{
        searchOption.classList.add('none')
        cards.forEach((card)=>{
        
          if(card.id===e.target.value){
            if(card.classList.contains('none')){
                card.classList.remove('none')
            }
        }else{
            card.classList.add('none')
        }  
        
        
    })
    }
    
})