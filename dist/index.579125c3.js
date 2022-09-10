const options = {};
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "29580630-b4d6d43b83d12c4d9cbbf2fc9";
let request = "boobs";
let pageNumber = 1;
fetch(`${BASE_URL}?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=12`).then((r)=>r.json()).then(console.log);

//# sourceMappingURL=index.579125c3.js.map
