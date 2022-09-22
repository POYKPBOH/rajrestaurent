import view from "./parentviewofrecipeview.js";
import previewview from "./previewview.js"
import icons from 'url:../img/icons.svg';

class Bookmarkview extends view{
 	_parentElement = document.querySelector(".bookmarks__list");
  _errorMessage= "No recipes found for your query. Please try again!";
  _message ='';

  addHandlerRander(handler){
    window.addEventListener("load",handler)
  }

  _generateMarkup(){
    console.log(this._data)
    return this._data.map(result => previewview.render(result,false)).join("");   
  } 
 }

 export default new Bookmarkview();