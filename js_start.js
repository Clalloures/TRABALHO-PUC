const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');


function selectItem(e) {
	removeBorder();
	removeShow();
	this.classList.add('tab-border');
	const tabContentItem = document.querySelector(`#${this.id}-content`);
	tabContentItem.classList.add('show');
}

function removeBorder() {
	tabItems.forEach(item => {
		item.classList.remove('tab-border');
	});
}


function removeShow() {
	tabContentItems.forEach(item => {
		item.classList.remove('show');
	});
}


tabItems.forEach(item => {
	item.addEventListener('click', selectItem);
});



const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6df552f7682f308c8b16045583168e77&language=pt-BR";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=6df552f7682f308c8b16045583168e77&query=";

const LASTED =    
    "https://api.themoviedb.org/3/discover/movie?sort_by=latest.desc&api_key=6df552f7682f308c8b16045583168e77&language=pt-BR"; 

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Favoritos
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
                <a href="https://www.themoviedb.org/search?query=${title}"><img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopse:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
