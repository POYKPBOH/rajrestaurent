import view from "./parentviewofrecipeview.js";
import previewview from "./previewview.js"

import icons from 'url:../img/icons.svg';

class ResultView extends view{
 	_parentElement = document.querySelector(".results");
  _errorMessage= "No recipes found for your query. Please try again!";
  _message ='';

    _generateMarkup(){
    console.log(this._data)
    return this._data.map(result => previewview.render(result,false)).join("");   
  } 

 	// _generateMarkup(){
  //   console.log(this._data,"this is resultview.js")
    
 	// 	return this._data.map(this._generateMarkupPreview).join(""); 	
 	// }

  // _generateMarkupPreview(ele){
  //   const id = window.location.hash.slice(1);
  //   return `<li class="preview">
  //           <a class="preview__link ${ele.id===id?"preview__link--active":" "}" href="#${ele.id}">
  //             <figure class="preview__fig">
  //               <img src=${ele.image} alt=${ele.title} />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${ele.title}</h4>
  //               <p class="preview__publisher">${ele.publisher}</p>
                
  //             </div>
  //           </a>
  //         </li> 
  //         `
  // }
 }

 // console.log(new ResultView())

 export default new ResultView();