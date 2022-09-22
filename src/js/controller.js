

console.log("hello world")
import * as model from "./model.js";
import recipeview from "./view.js";
import {MODAL_CLOSE_SEC} from "./config.js"
import searchview from "./searchview.js"
import resultview from "./resultview.js"
import bookmarkview from "./bookmarkview.js"
import addrecipeview from './addrecipeview.js'
import paginationview from "./paginationview.js"
import "core-js/stable";
import "regenerator-runtime/runtime";
const recipeContainer = document.querySelector('.recipe');

// if(module.hot){
//   module.hot.accept()
// }
// console.log(resultview._parentElement)
console.log("controller.js");


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if(module.hot){
//   module.hot.accept()
// }

const showRecipe=async function(){
try{
  const id = window.location.hash.slice(1);
 

  if(!id) return ;
  recipeview.renderSpinner()

resultview.update(model.getSearchResultsPage())

 // 1)loading recipee

  await model.loadRecipe(id)
recipeview.render(model.state.recipe)
// console.log(recipeview.render(model.state.recipe))
  // model.updateServings(100)
// recipeview.render(model.state.recipe);



}catch(err){
  console.error(err)
  recipeview.renderError(err)
  throw err;
}
}

// showRecipe()
const controlSearchResult =async function(){
try{


  resultview.renderSpinner()
  // 1)get search querry
  const query =searchview.getQuerry();
  if(!query) return;
  // 2)load search results
 await model.loadSearchResult(query);
 console.log(model.state.search.result);
    resultview.render(model.getSearchResultsPage());

// 3)render results
console.log(resultview.render(model.getSearchResultsPage()))
// 4)render initial pagination view
paginationview.render(model.state.search);

}catch(err){
  console.log(err)
  throw err
}
}

// controlSearchResult();
const controlPagination = function(goToPage){
  console.log("pag control")
  console.log(goToPage)
  resultview.render(model.getSearchResultsPage(goToPage))
// console.log(resultview.render(model.getSearchResultsPage(3)))
// 4)render initial pagination view
paginationview.render(model.state.search);

}

const controlServings = function(updateTo){
  model.updateServings(updateTo);
recipeview.update(model.state.recipe);
}

const controlAddBookmark=function(){
  // add/Delete bookmarks 
   if(!model.state.recipe.bookmarked)  {
    model.addBookmark(model.state.recipe)
  }
    else{model.deleteBookmark(model.state.recipe.id)};
    // updateBookmarks
    recipeview.update(model.state.recipe);

    // 3)Render bookmarks
    bookmarkview.render(model.state.bookmarks);
}
// controlAddBookmark()

const controlBookmarks = function (){
  try{
    bookmarkview.render(model.state.bookmarks)
  }catch(err){
    console.log(err)
    throw err
    console.log(err)
  }
}

const controlAddrecipe =async function(newRecipe){
try{
  //show loading spinner
  addrecipeview.renderSpinner(newRecipe)
   
  // upload the new recipee

await model.uploadRecipe(newRecipe);
console.log(model.state.recipe)

// render recipe
recipeview.render(model.state.recipe);

//success message
addrecipeview.renderMessage();


// render bookmark view
bookmarkview.render(model.state.bookmarks);

window.history.pushState(null,"",`#${model.state.recipe.id}`)
// close form window
setTimeout(function(){
  addrecipeview.toggleWindow();
},MODAL_CLOSE_SEC * 1000);




}
catch(err){
  console.log(err)
  addrecipeview.renderError(err.message);
}
}

const init = async function(){
recipeview.addHandlerRender(showRecipe);
recipeview.addHandlerUpdateServings(controlServings);
recipeview.addHandlerAddBookmarked(controlAddBookmark);
searchview.addHandlerSearch(controlSearchResult);
bookmarkview.addHandlerRander(controlBookmarks);

addrecipeview.addHandlerUpload(controlAddrecipe)
paginationview.addHandlerClick(controlPagination);
console.log(123)
}

init();

console.log("hello world")

const APIKEY = "f7eb834b-5cf3-4675-a112-8626903ab320"


// console.log(addrecipeview)
 // a ="https://www.freecodecamp.org/settings#certification-settings"




// const events = ["load","hashchange"]
//  events.forEach(ele=>window.addEventListener(ele,showRecipe))
// window.addEventListener("hashchange",showRecipe)


// console.log(resultview.renderSpinner())

