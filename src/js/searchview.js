class SearchView {
	parentele = document.querySelector(".search");

	getQuerry(){
		const querry =  this.parentele.querySelector(".search__field").value;
		this._clearInput()
		return querry;

	}
	_clearInput(){
		this.parentele.querySelector(".search__field").value = "";
	}

	addHandlerSearch(handler){
		this.parentele.addEventListener("submit",function(e){
			e.preventDefault();
			handler();

		});
	}
	
}


export default new SearchView();

console.log("SearchView============================")

const raj = new SearchView()
console.log(raj.parentele.querySelector(".search__field").value)