import icons from 'url:../img/icons.svg';


export default class View{
	
  _data;

/** 
 * Render the received object to the DOM
 * @param {Object | }*/

	render(data, render = true){
    if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();

    // console.log(data)
    
		this._data = data;
		const markup= this._generateMarkup();

    if(!render) return markup;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin",markup)


	}

  update(data){
    // if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
    this._data = data;
    const newmarkup= this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newmarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElement = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((newEle,i)=>{
      
     const curEle = currentElement[i];
      // console.log(newEle.isEqualNode(curEle))
      // update changed text
      if(!newEle.isEqualNode(curEle) && newEle.firstChild?.nodeValue.trim() !== ""){
        console.log(newEle)
        curEle.textContent = newEle.textContent;
      }
      if(!newEle.isEqualNode(curEle))
        Array.from(newEle.attributes).forEach(attr=>curEle.setAttribute(attr.name,attr.value)
          );
    });

  }
 

renderSpinner(){
  const markup = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup)
}

	_clear(){
		this._parentElement.innerHTML="";
	}
renderError(message=this._errorMessage){
    const markup=`
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`


          this._clear();
          this._parentElement.insertAdjacentHTML("afterbegin",markup);
  }


  renderMessage(message=this._message){
    const markup=`
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`


          this._clear();
          this._parentElement.insertAdjacentHTML("afterbegin",markup);

  }
}