import {API_URL,RES_PER_PAGE,KEY} from "./config.js";
import {Ajax} from "./helper.js";
export const state = {
	recipe:{},
	search:{
		query:``,
		result:[ ],
		resultperpage:RES_PER_PAGE,
		page:1
	},
	bookmarks:[],
}


const createRecipeObjects = function(data){
	let {recipe} = data.data;
	// console.log(recipe)
	return{
	  cookingTimes:recipe.cooking_time,
	  id:recipe.id,
	  image:recipe.image_url,
	  ingredients:recipe.ingredients,
	  publisher:recipe.publisher,
	  servings:recipe.servings,
	  sourceUrl:recipe.source_url,
	  title:recipe.title,
	  ...(recipe.key && {key:recipe.key})
}


}

export const loadRecipe =async function(id){
	try{
		// console.log(`${API_URL}/${id}`)
		// API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes'
		const data = await Ajax(`${API_URL}/${id}?key=${KEY}`)
		state.recipe =createRecipeObjects(data)
	// console.log(data.data);
	
if(state.bookmarks.some(bookmark=>bookmark.id ===id)){
	state.recipe.bookmarked = true;
	}
	else{
		state.recipe.bookmarked = false;
	}


}catch(err){
	console.error(err)
	throw err;
	}
};



export const loadSearchResult =async function(query){
	try{
		state.search.query = query;
			const data = await Ajax(`${API_URL}?search=${query}&key=${KEY}`);
				
			
			state.search.result = data.data.recipes.map(ele=>{

				// console.ele)/
				return {
				id:ele.id,
				image:ele.image_url,
				publisher:ele.publisher,
				title:ele.title,
				...(ele.key && {key:ele.key}),


			}

				});

			state.search.page= 1;
			// console.log(state.search.result)
	}catch(err){
		console.log(err)
		throw err;
	}
}



export const getSearchResultsPage = function(page=state.search.page){
	state.search.page=page;
	const start = (page-1)*state.search.resultperpage;
	const end = (page)*state.search.resultperpage;
	return state.search.result.slice(start,end);
}


export const updateServings = function(numofserving){
	state.recipe.ingredients.forEach(ele=>{
		ele.quantity = (ele.quantity * numofserving) / state.recipe.servings;
		
	});
	state.recipe.servings = numofserving;
}

// loadSearchResult("pizza");
// console.log(state.search.result)

// console.log(state.search.query)
// console.log(loadSearchResult(`pizza`))

 
const persistBookmarks = function(){
	localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks));
};

export const addBookmark = function(recipe){
	state.bookmarks.push(recipe);
	if(recipe.id === state.recipe.id){
		state.recipe.bookmarked = true;
	}
	persistBookmarks();
// console.log(state.bookmarks)
// console.log(state.bookmarks)
	
}


export const deleteBookmark = function(id){
	const index = state.bookmarks.findIndex(el=>el.id===id)
	state.bookmarks.splice(index,1);

	//mark current recipe as not bookmarks
	if(id === state.recipe.id) state.recipe.bookmarked = false;

	persistBookmarks();

}


const init = function(){
	const storage = localStorage.getItem("bookmarks");
	if(storage){
		state.bookmarks = JSON.parse(storage);


	}
}

init();

const clearBookmarks = function(){
	localStorage.clear("bookmarks")
}
console.log(state.bookmarks)


export const uploadRecipe = async function (newRecipe){
try{
	 const ingredients = Object.entries(newRecipe)
	 .filter(ele=>ele[0].startsWith("ingredient") && ele[1] !=="")
	 .map(ing=>{

	 	const ingrid =  ing[1].split(",").map(el => el.trim());
	 	if(ingrid.length !== 3) throw new Error("wrong ingrident format pls use the correct format");

	 	[quantity,unit,description] = ingrid;
	 
	 	return {quantity:quantity?+quantity:null,unit,description}
	 	
	 });


	 console.log(ingredients)

const recipe = {
	title : newRecipe.title,
	source_url:newRecipe.sourceUrl,

	image_url:newRecipe.image,

	publisher:newRecipe.publisher,

	cooking_time:+newRecipe.cookingTime,
	servings:+newRecipe.servings,
	 ingredients
}
console.log(recipe.servings,recipe.ingredients)
console.log(recipe)
const data=await Ajax(`${API_URL}?key=${KEY}`,recipe);
state.recipe = createRecipeObjects(data) ;
	addBookmark(state.recipe);
}
catch(err){ 
	throw err;

}
}
