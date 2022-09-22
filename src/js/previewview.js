import view from "./parentviewofrecipeview.js";
import icons from 'url:../img/icons.svg';

class Previewview extends view{
 	_parentElement = "";
  

 	// _generateMarkup(){
  //   console.log(this._data,"this is resultview.js")
    
 	// 	return this._data.map(this._generateMarkupPreview).join(""); 	
 	// }

   _generateMarkup(ele){
    const id = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${this._data.id===id?"preview__link--active":" "}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src=${this._data.image} alt=${this._data.title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                
              </div>
              <div class="preview__user-generated ${
              this._data.key ? '' : 'hidden'
            }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            </a>
          </li> 
          `
  }
 }

 // console.log(new ResultView())

 export default new Previewview();