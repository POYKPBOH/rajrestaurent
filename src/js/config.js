export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = "f7eb834b-5cf3-4675-a112-8626903ab320";
export const MODAL_CLOSE_SEC = 2.5;


// export const API_URL = async function(url){
// 	try{
// 		const res = await fetch(`url`);
// 	const data = await res.json();
// 	if(!res.ok) throw new Error(`${data.message} status (${res.status})`)
// 		return data
// 	}
// 	catch(err){
// 		console.error(err)
// 	}
// }