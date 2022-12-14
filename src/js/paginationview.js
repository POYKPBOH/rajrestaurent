import view from "./parentviewofrecipeview.js"

import icons from 'url:../img/icons.svg';

class PaginationView extends view{
		_parentElement=document.querySelector('.pagination');



		addHandlerClick(handler){
			this._parentElement.addEventListener("click",function(e){
				const btn = e.target.closest(".btn--inline");
				if(!btn)return;
				// console.log(btn)s
				const goToPage = +btn.dataset.goto;
				handler(goToPage);

			})
		}

	_generateMarkup(){
		const currentPage = this._data.page;
		console.log(this._data.page,this._data,"this is paginationview.js")
		const numPage = Math.ceil(this._data.result.length/this._data.resultperpage);
		// console.log(numPage)s
		// console.log(currentPage)s
		// console.log(this._data.page)s
	
		if(currentPage===1 && numPage>1){
			return `<button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
		}
		if(currentPage === numPage && numPage >1 ){
			return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>`;
		}
		if(currentPage < numPage){
			return `<button data-goto="${currentPage-1}"   class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button data-goto="${currentPage+1}"   class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
		}
		return ``
	}
}


export default new PaginationView();