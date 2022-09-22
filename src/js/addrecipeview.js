import view from "./parentviewofrecipeview.js";
import icons from 'url:../img/icons.svg';

class Addrecipeview extends view{
	_parentElement = document.querySelector(".upload");
	_message = 'recipe was successfully uploaded';
	_window = document.querySelector(".add-recipe-window");
	_overlay = document.querySelector(".overlay");
	_btnOpen = document.querySelector(".nav__btn--add-recipe");
	_btnClose = document.querySelector(".btn--close-modal");

	constructor(){
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
		this.hello();

	}

	hello(){
		console.error("helojkjkjjkj")
	}
	toggleWindow(){
			
				this._overlay.classList.toggle("hidden");
				this._window.classList.toggle("hidden")
		}
	_addHandlerShowWindow(){
		this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))
	}
	_addHandlerHideWindow(){
		this._btnClose.addEventListener("click",this.toggleWindow.bind(this))
	}

	addHandlerUpload(handler){
		this._parentElement.addEventListener("submit",function(e){
			e.preventDefault();
			const data =[ ...new FormData(this)]
			console.log(data)

			const dataToObject = Object.fromEntries(data)
			// console.log(dataToObject)
			handler(dataToObject)
		})
	}
	_generateMarkup(){

	}
}

export default new Addrecipeview();