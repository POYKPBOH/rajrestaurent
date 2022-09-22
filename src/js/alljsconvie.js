// controller code 
import * as model from "./model.js";

import recipeview from "./view.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// console.log(icons)
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



if(module.hot){
  module.hot.accept()
}

const showRecipe=async function(){
try{
  const id = window.location.hash.slice(1);
 

  if(!id) return ;
  recipeview.renderSpinner()

 // 1)loading recipee

  await model.loadRecipe(id)
recipeview.render(model.state.recipe)
console.log(recipeview.render(model.state.recipe))


}catch(err){
  console.error(err)
}
}

console.log("rajendra jangid");
// showRecipe()
const events = ["hashchange","load"]
 events.forEach(ele=>window.addEventListener(ele,showRecipe))
// window.addEventListener("hashchange",showRecipe)















// view.js===============================

import icons from 'url:../img/icons.svg';


class RecipeView{
	#parentElement = document.querySelector(".recipe");
	#data;
	render(data){
		this.#data = data;
		const markup= this.#generateMarkup();
		this.#clear();
		this.#parentElement.insertAdjacentHTML("afterbegin",markup)


	}

	

renderSpinner(){
  const markup = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
        this.#clear();
        this.#parentElement.insertAdjacentHTML("afterbegin",markup)
}

	#clear(){
		this.#parentElement.innerHTML="";
	}

	#generateMarkup(){
		
return ` 
 <figure class="recipe__fig">
          <img src="${this.#data.imageUrl}" alt="${this.#data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTimes}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">

            ${this.#data.ingredients.map(ing=>{
            
            const nullish = (""+ing.quantity==="null")?'U+2408':ing.quantity

            return `
             <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${((""+ing.quantity=="null")?"": ing.quantity )}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li> 
            `

            }).join("")}

            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
`

	}
}



export default new RecipeView(); 























// model.js==========================================================i-1


export const state = {
	recipe:{

	}
}

console.log("==================state=========");
// console.log(state)
export const loadRecipe =async function(id){
	try{
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
	const data = await res.json();
	if(!res.ok) throw new Error(`${data.message} status (${res.status})`)
	console.log(data.data);
	let {recipe} = data.data;
	console.log(recipe)
	state.recipe = {
	  cookingTimes:recipe.cooking_time,
	  id:recipe.id,
	  imageUrl:recipe.image_url,
	  ingredients:recipe.ingredients,
	  publisher:recipe.publisher,
	  servings:recipe.servings,
	  sourceUrl:recipe.source_url,
	  title:recipe.title
}
}
catch(err){
	console.error(err)
	}

console.log(state.recipe)
};